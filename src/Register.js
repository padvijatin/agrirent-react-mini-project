import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE } from './config';

export default function Register() {
  const [form, setForm] = useState({ username:'', email:'', password:'', confirmPassword:'' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErr('');

    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setErr('Fill all fields');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErr('Passwords do not match');
      return;
    }

    fetch(`${API_BASE}/api/register.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: form.username,
        email: form.email,
        password: form.password
      })
    })
      .then(async (res) => {
        const js = await res.json().catch(() => null);
        if (!res.ok) throw new Error(js?.error || 'Registration failed');
        return js;
      })
      .then((js) => {
        if (js && js.success) navigate('/login');
        else setErr(js?.error || 'Registration failed');
      })
      .catch((err) => setErr('Network error: ' + err.message));
  }

  return (
    <div>
      <nav className="navbar">
        <div>
          <Link to="/home" style={{ color: "#fff", fontWeight: "700" }}>
            AgriRent
          </Link>
        </div>
        <div>
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/equipment">Equipment</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input name="username" value={form.username} onChange={handleChange} required />

          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required />

          <label>Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} required />

          <label>Confirm Password</label>
          <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required />

          {err && <p className="error-message">{err}</p>}

          <button type="submit">Register</button>
        </form>

        <p style={{ marginTop: 12 }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

      <footer className="footer">
        © 2025 AgriRent. All Rights Reserved.
      </footer>
    </div>
  );
}
