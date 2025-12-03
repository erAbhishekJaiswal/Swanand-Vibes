import React, { useEffect, useState } from 'react';
import "../../../CssFiles/Admin/product/AddCategory.css";
import axiosInstance from '../../../utills/axiosInstance';
export default function AddCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      setLoading(true);
      setError('');
      // Replace the URL with your real API endpoint
      const res = await fetch(`${import.meta.env.VITE_API_URL}/category/`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      // console.log(res, data);
      
      setCategories(data.categories);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!name.trim()) return setError('Category name cannot be empty');

    try {
      setLoading(true);
      setError('');
      setSuccess('');
      const res = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/category`, { name: name.trim() });
      const newCat = res.data;
      // console.log(newCat);

      // const res = await fetch(`${import.meta.env.VITE_API_URL}/category`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name: name.trim() }),
      // });
      // if (!res.ok) {
      //   const err = await res.json().catch(() => ({}));
      //   throw new Error(err.message || 'Failed to add category');
      // }
      // const newCat = await res.json();

      setCategories(prev => [newCat, ...prev]);
      setName('');
      setSuccess('Category added successfully');
      setTimeout(() => setSuccess(''), 3000);
      fetchCategories();
    } catch (err) {
      setError(err.message || 'Failed to add');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      setLoading(true);
      setError('');
      // const res = await fetch(`${import.meta.env.VITE_API_URL}/category/${id}`, { method: 'DELETE' });
      // if (!res.ok) throw new Error('Failed to delete category');
      await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/category/${id}`);
      
      setCategories(prev => prev.filter(c => c._id !== id));
      setSuccess('Category deleted');
      setTimeout(() => setSuccess(''), 2500);
    } catch (err) {
      setError(err.message || 'Failed to delete');
    } finally {
      setLoading(false);
    }
  }

//   const filtered = categories.filter(c =>
//     c.name.toLowerCase().includes(search.trim().toLowerCase())
//   );

// const filtered = Array.isArray(categories)
//   ? categories.filter(c =>
//       typeof c.name === 'string' &&
//       c.name.toLowerCase().includes(search?.trim().toLowerCase() || '')
//     )
//   : [];

const filtered = Array.isArray(categories)
  ? categories
      .filter(c =>
        typeof c.name === 'string' &&
        c.name.toLowerCase().includes(search?.trim().toLowerCase() || '')
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // 🔥 Sort by most recent
  : [];

  return (
    <div className="cat-admin-root">
      <div className="cat-card">
        <header className="cat-header">
          <h1>Manage Categories</h1>
          <p className="muted">Add, search and delete categories for your store</p>
        </header>

        <form className="cat-form" onSubmit={handleAdd}>
          <div className="form-left">
            <input
              className="input"
              placeholder="New category name (e.g. Electronics)"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={loading}
            />
            <button className="btn primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Add Category'}
            </button>
          </div>

          <div className="form-right">
            <input
              className="input search"
              placeholder="Search categories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </form>

        {error && <div className="alert danger">{error}</div>}
        {success && <div className="alert success">{success}</div>}

        <div className="list-wrap">
          {loading && categories.length === 0 ? (
            <div className="empty">Loading categories...</div>
          ) : filtered.length === 0 ? (
            <div className="empty">No categories found</div>
          ) : (
            <ul className="cat-list">
              {filtered.map(cat => (
                <li key={cat._id} className="cat-item">
                  <div className="left">
                    <div className="avatar">{cat.name.charAt(0).toUpperCase()}</div>
                    <div className="meta">
                      <div className="name">{cat.name}</div>
                      {/* <div className="id">{cat._id}</div> */}
                    </div>
                  </div>

                  <div className="right">
                    <button
                      className="btn danger sm"
                      onClick={() => handleDelete(cat._id)}
                      aria-label={`Delete ${cat.name}`}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="cat-footer">
          <small>Tip: Categories are case-insensitive and unique.</small>
        </footer>
      </div>
    </div>
  );
}