import { useState, useEffect } from 'react';
import api from '../api';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', isbn: '', category: '', totalCopies: 1 });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const load = () => api.get('/books').then(res => setBooks(res.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ title: '', author: '', isbn: '', category: '', totalCopies: 1 });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        await api.put(`/books/${editingId}`, form);
      } else {
        await api.post('/books', form);
      }
      resetForm();
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleEdit = (book) => {
    setForm({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      category: book.category,
      totalCopies: book.totalCopies
    });
    setEditingId(book._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this book?')) return;
    await api.delete(`/books/${id}`);
    load();
  };

  return (
    <div className="container">
      <h2>Books</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="row g-2 mb-4 align-items-end">
        <div className="col-md-2">
          <label className="form-label">Title</label>
          <input className="form-control" value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })} required />
        </div>
        <div className="col-md-2">
          <label className="form-label">Author</label>
          <input className="form-control" value={form.author}
            onChange={e => setForm({ ...form, author: e.target.value })} required />
        </div>
        <div className="col-md-2">
          <label className="form-label">ISBN</label>
          <input className="form-control" value={form.isbn}
            onChange={e => setForm({ ...form, isbn: e.target.value })} required />
        </div>
        <div className="col-md-2">
          <label className="form-label">Category</label>
          <input className="form-control" value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })} required />
        </div>
        <div className="col-md-2">
          <label className="form-label">Copies</label>
          <input type="number" min="1" className="form-control" value={form.totalCopies}
            onChange={e => setForm({ ...form, totalCopies: e.target.value })} required />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" type="submit">
            {editingId ? 'Update' : 'Add'} Book
          </button>
        </div>
        {editingId && (
          <div className="col-12">
            <button type="button" className="btn btn-link" onClick={resetForm}>Cancel edit</button>
          </div>
        )}
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th><th>Author</th><th>ISBN</th><th>Category</th><th>Available</th><th></th>
          </tr>
        </thead>
        <tbody>
          {books.map(b => (
            <tr key={b._id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.isbn}</td>
              <td>{b.category}</td>
              <td>{b.availableCopies} / {b.totalCopies}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(b)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(b._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
