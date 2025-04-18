import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ReturnFormData {
  event: string;
  orderNumber: string;
  confirmDate: string;
  customerName: string;
  skuList: string;
  reason?: string;
  notes?: string;
}

const EVENT_TYPES = ['Reso', 'Cambio', 'Riparazione'];
const RETURN_REASONS = [
  'Difettoso',
  'Taglia errata',
  'Non corrisponde alla descrizione',
  'Altro'
];

export const ReturnForm: React.FC = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<ReturnFormData>({
    event: '',
    orderNumber: '',
    confirmDate: new Date().toISOString().split('T')[0],
    customerName: '',
    skuList: '',
    reason: '',
    notes: ''
  });

  const createReturnMutation = useMutation({
    mutationFn: async (data: ReturnFormData) => {
      const response = await fetch('/api/returns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          skuList: data.skuList.split(',').map(sku => sku.trim()),
        }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['returns'] });
      setFormData({
        event: '',
        orderNumber: '',
        confirmDate: new Date().toISOString().split('T')[0],
        customerName: '',
        skuList: '',
        reason: '',
        notes: ''
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReturnMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="event" className="block text-sm font-medium text-gray-700">
            Evento
          </label>
          <select
            id="event"
            name="event"
            value={formData.event}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Seleziona un evento</option>
            {EVENT_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">
            Numero Ordine
          </label>
          <input
            type="text"
            id="orderNumber"
            name="orderNumber"
            value={formData.orderNumber}
            onChange={handleChange}
            placeholder="SW#"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="confirmDate" className="block text-sm font-medium text-gray-700">
            Data Conferma
          </label>
          <input
            type="date"
            id="confirmDate"
            name="confirmDate"
            value={formData.confirmDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
            Nome Cliente
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="skuList" className="block text-sm font-medium text-gray-700">
            SKU (separati da virgola)
          </label>
          <input
            type="text"
            id="skuList"
            name="skuList"
            value={formData.skuList}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
            Motivo del Reso
          </label>
          <select
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Seleziona un motivo</option>
            {RETURN_REASONS.map(reason => (
              <option key={reason} value={reason}>{reason}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Note
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={createReturnMutation.isPending}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {createReturnMutation.isPending ? 'Salvataggio...' : 'Salva'}
        </button>
      </div>
    </form>
  );
}; 