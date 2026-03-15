import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");

    if (!form.email || !form.password) {
      setErr("Fill all fields");
      return;
    }

    fetch("http://localhost/agrirent-react/api/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((r) => r.json())
      .then((js) => {
        if (js.success && js.user) {
          localStorage.setItem("agrirent_user", JSON.stringify(js.user));
          navigate("/home");
        } else {
          setErr(js.error || "Login failed");
        }
      })
      .catch(() => setErr("Network error"));
  };

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
        <h2>User Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {err && <p className="error-message">{err}</p>}

          <button className="submit-button" type="submit">
            Login
          </button>
        </form>

        <p style={{ marginTop: 12 }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>

      <footer className="footer">
        <p>© 2025 AgriRent. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
