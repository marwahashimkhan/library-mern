import { useState, useEffect } from 'react';
import api from '../api';

export default function Transactions() {
  const [txns, setTxns] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ bookId: '', memberId: '', dueDate: '' });
  const [error, setError] = useState('');

  const load = () => {
    api.get('/transactions').then(res => setTxns(res.data)).catch(() => {});
    api.get('/books').then(res => setBooks(res.data)).catch(() => {});
    api.get('/members').then(res => setMembers(res.data)).catch(() => {});
  };
  useEffect(() => { load(); }, []);

  const handleBorrow = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/transactions/borrow', form);
      setForm({ bookId: '', memberId: '', dueDate: '' });
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleReturn = async (id) => {
    try {
      await api.put(`/transactions/return/${id}`);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="container">
      <h2>Transactions (Borrow / Return)</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleBorrow} className="row g-2 mb-4 align-items-end">
        <div className="col-md-4">
          <label className="form-label">Book</label>
          <select className="form-select" value={form.bookId}
            onChange={e => setForm({ ...form, bookId: e.target.value })} required>
            <option value="">Select a book</option>
            {books.map(b => (
              <option key={b._id} value={b._id} disabled={b.availableCopies < 1}>
                {b.title} ({b.availableCopies} available)
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Member</label>
          <select className="form-select" value={form.memberId}
            onChange={e => setForm({ ...form, memberId: e.target.value })} required>
            <option value="">Select a member</option>
            {members.map(m => (
              <option key={m._id} value={m._id}>{m.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Due Date</label>
          <input type="date" className="form-control" value={form.dueDate}
            onChange={e => setForm({ ...form, dueDate: e.target.value })} required />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" type="submit">Borrow</button>
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr><th>Book</th><th>Member</th><th>Borrow Date</th><th>Due Date</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          {txns.map(t => (
            <tr key={t._id}>
              <td>{t.bookId?.title || 'N/A'}</td>
              <td>{t.memberId?.name || 'N/A'}</td>
              <td>{new Date(t.borrowDate).toLocaleDateString()}</td>
              <td>{new Date(t.dueDate).toLocaleDateString()}</td>
              <td>
                <span className={`badge ${t.status === 'returned' ? 'bg-success' : 'bg-warning text-dark'}`}>
                  {t.status}
                </span>
              </td>
              <td>
                {t.status === 'borrowed' && (
                  <button className="btn btn-sm btn-success" onClick={() => handleReturn(t._id)}>
                    Mark Returned
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
