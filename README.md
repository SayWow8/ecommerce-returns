# E-commerce Returns Management System

Un sistema moderno e responsive per la gestione dei resi di un e-commerce.

## Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: NestJS + PostgreSQL
- **ORM**: Prisma

## Deployment

### Frontend (Vercel)

1. Crea un account su [Vercel](https://vercel.com)
2. Connetti il tuo repository GitHub
3. Seleziona il progetto frontend
4. Configura le variabili d'ambiente:
   ```
   REACT_APP_API_URL=https://[your-railway-backend-url]
   ```
5. Clicca su "Deploy"

### Backend (Railway)

1. Crea un account su [Railway](https://railway.app)
2. Connetti il tuo repository GitHub
3. Seleziona il progetto backend
4. Aggiungi un nuovo servizio PostgreSQL
5. Configura le variabili d'ambiente:
   ```
   DATABASE_URL=[your-postgres-url]
   PORT=3001
   NODE_ENV=production
   FRONTEND_URL=https://[your-vercel-frontend-url]
   ```
6. Clicca su "Deploy"

## Sviluppo Locale

### Prerequisiti

- Node.js (v18 o superiore)
- PostgreSQL (v14 o superiore)
- npm o yarn

### Installazione

1. Clona il repository:
```bash
git clone [repository-url]
cd ecommerce-returns
```

2. Installa le dipendenze del backend:
```bash
cd backend
npm install
```

3. Installa le dipendenze del frontend:
```bash
cd ../frontend
npm install
```

4. Configura il database:
- Crea un database PostgreSQL
- Copia `.env.example` in `.env` e configura le variabili d'ambiente
- Esegui le migrazioni del database:
```bash
cd backend
npx prisma migrate dev
```

### Avvio dell'applicazione

1. Avvia il backend:
```bash
cd backend
npm run start:dev
```

2. Avvia il frontend:
```bash
cd frontend
npm run dev
```

L'applicazione sarà disponibile su `http://localhost:3000`

## Struttura del Progetto

```
ecommerce-returns/
├── frontend/          # Applicazione React
├── backend/           # API NestJS
└── docs/             # Documentazione
```

## API Endpoints

### Returns

- `GET /api/returns` - Lista dei resi (paginata)
- `POST /api/returns` - Crea un nuovo reso
- `PUT /api/returns/:id` - Aggiorna un reso
- `DELETE /api/returns/:id` - Elimina un reso
- `POST /api/returns/bulk-update` - Aggiornamento di massa

## Supporto

Per problemi o domande, apri una issue nel repository. 