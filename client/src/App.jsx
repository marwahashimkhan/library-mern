import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Books from './pages/Books.jsx';
import Members from './pages/Members.jsx';
import Transactions from './pages/Transactions.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-dark bg-dark px-3 mb-3">
        <Link className="navbar-brand" to="/books">📚 Library</Link>
        <div>
          <Link className="text-white text-decoration-none mx-2" to="/books">Books</Link>
          <Link className="text-white text-decoration-none mx-2" to="/members">Members</Link>
          <Link className="text-white text-decoration-none mx-2" to="/transactions">Transactions</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/books" />} />
        <Route path="/books" element={<Books />} />
        <Route path="/members" element={<Members />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </BrowserRouter>
  );
}
