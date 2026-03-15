import React from "react";
import { Link } from "react-router-dom";

export default function Contact() {
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

      <div className="container" style={{ marginTop: "40px" }}>
        <h1>Contact</h1>
        <p>Email: padvijatin129@gmail.com</p>
      </div>

      <footer className="footer">
        © 2025 AgriRent. All Rights Reserved.
      </footer>
    </div>
  );
}
