# Library Management System (MERN)

CRUD app for Books, Members, and Borrow/Return Transactions.

## Setup

### 1. Backend
```bash
cd server
npm install
cp .env.example .env
```
Edit `.env` and paste your MongoDB Atlas connection string into `MONGO_URI`.

```bash
npm run seed   # optional: adds 3 sample books + 2 sample members
npm run dev    # starts on http://localhost:5000
```

### 2. Frontend
Open a second terminal:
```bash
cd client
npm install
npm run dev    # starts on http://localhost:5173
```

Open http://localhost:5173 in your browser.

## Folder structure
```
library-mern/
├── server/
│   ├── models/        Book.js, Member.js, Transaction.js
│   ├── controllers/   CRUD logic
│   ├── routes/        API endpoints
│   ├── seed.js         sample data
│   └── server.js
└── client/
    └── src/
        ├── pages/      Books.jsx, Members.jsx, Transactions.jsx
        ├── App.jsx
        └── api.js
```

## API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/books | List all books |
| POST | /api/books | Create a book |
| PUT | /api/books/:id | Update a book |
| DELETE | /api/books/:id | Delete a book |
| GET | /api/members | List all members |
| POST | /api/members | Create a member |
| PUT | /api/members/:id | Update a member |
| DELETE | /api/members/:id | Delete a member |
| GET | /api/transactions | List all transactions |
| POST | /api/transactions/borrow | Borrow a book |
| PUT | /api/transactions/return/:id | Return a book |
