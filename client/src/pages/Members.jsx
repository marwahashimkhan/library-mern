import { useState, useEffect } from 'react';
import api from '../api';

export default function Members() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const load = () => api.get('/members').then(res => setMembers(res.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ name: '', email: '', phone: '' });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        await api.put(`/members/${editingId}`, form);
      } else {
        await api.post('/members', form);
      }
      resetForm();
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleEdit = (member) => {
    setForm({ name: member.name, email: member.email, phone: member.phone });
    setEditingId(member._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this member?')) return;
    await api.delete(`/members/${id}`);
    load();
  };

  return (
    <div className="container">
      <h2>Members</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="row g-2 mb-4 align-items-end">
        <div className="col-md-3">
          <label className="form-label">Name</label>
          <input className="form-control" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="col-md-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div className="col-md-3">
          <label className="form-label">Phone</label>
          <input className="form-control" value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })} required />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary w-100" type="submit">
            {editingId ? 'Update' : 'Add'} Member
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
          <tr><th>Name</th><th>Email</th><th>Phone</th><th>Joined</th><th></th></tr>
        </thead>
        <tbody>
          {members.map(m => (
            <tr key={m._id}>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>{m.phone}</td>
              <td>{new Date(m.membershipDate).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(m)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(m._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
