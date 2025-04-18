import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

// Tipi
type ReturnStatus = 'IN_ATTESA' | 'APPROVATO' | 'RIFIUTATO' | 'COMPLETATO';

interface Return {
  id: string;
  event: string;
  orderNumber: string;
  confirmDate: string;
  customerName: string;
  skuList: string[];
  status: ReturnStatus;
  reason?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Componente Badge per lo stato
const StatusBadge: React.FC<{ status: ReturnStatus }> = ({ status }) => {
  const statusColors = {
    IN_ATTESA: 'bg-yellow-100 text-yellow-800',
    APPROVATO: 'bg-green-100 text-green-800',
    RIFIUTATO: 'bg-red-100 text-red-800',
    COMPLETATO: 'bg-blue-100 text-blue-800',
  };

  const statusLabels = {
    IN_ATTESA: 'In attesa',
    APPROVATO: 'Approvato',
    RIFIUTATO: 'Rifiutato',
    COMPLETATO: 'Completato',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
      {statusLabels[status]}
    </span>
  );
};

export const ReturnTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Fetch dei dati
  const { data, isLoading } = useQuery({
    queryKey: ['returns', page],
    queryFn: async () => {
      const response = await fetch(`/api/returns?page=${page}&limit=20`);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Caricamento...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRows(data.items.map((item: Return) => item.id));
                  } else {
                    setSelectedRows([]);
                  }
                }}
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Evento
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ordine
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data Conferma
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cliente
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stato
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.items.map((returnItem: Return) => (
            <tr key={returnItem.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={selectedRows.includes(returnItem.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows([...selectedRows, returnItem.id]);
                    } else {
                      setSelectedRows(selectedRows.filter(id => id !== returnItem.id));
                    }
                  }}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {returnItem.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {returnItem.event}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {returnItem.orderNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {format(new Date(returnItem.confirmDate), 'dd/MM/yyyy', { locale: it })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {returnItem.customerName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={returnItem.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginazione */}
      <div className="flex justify-between items-center mt-4 px-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Precedente
          </button>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={!data.hasNextPage}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Successivo
          </button>
        </div>
        <span className="text-sm text-gray-600">
          Pagina {page} di {data.totalPages}
        </span>
      </div>
    </div>
  );
}; 