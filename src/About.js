import React from "react";
import { Link } from "react-router-dom";

export default function About() {
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
  <h1>About Us</h1>
  <p>
    AgriRent is a modern digital platform designed to empower farmers by providing
    affordable and convenient access to agricultural equipment on rental. We
    understand that owning machinery like tractors, rotavators, harvesters, and
    sprayers can be expensive for many farmers, especially small and marginal ones.
  </p>

  <p>
    Our mission is to bridge the gap between equipment owners and farmers who
    need machinery on demand. Through AgriRent, farmers can easily browse, compare,
    and rent equipment online without any middlemen or hidden charges.
  </p>

  <h3> Our Key Objectives</h3>
  <ul>
    <li>Provide cost-effective agricultural solutions through equipment rental</li>
    <li>Reduce investment burden of purchasing costly machinery</li>
    <li>Increase productivity and support sustainable farming</li>
    <li>Connect equipment owners and farmers through a transparent system</li>
  </ul>

  <h3> Why Choose AgriRent?</h3>
  <ul>
    <li>Wide range of farming equipment</li>
    <li>Simple booking process and fair pricing</li>
    <li>Verified equipment owners and trusted service</li>
    <li>24/7 customer support and real-time availability</li>
  </ul>

  <p>
    At AgriRent, we believe that technology can transform agriculture and improve
    the lives of farmers. Together, let's build a future where farming becomes
    smarter, easier, and more efficient.
  </p>
</div>


      <footer className="footer">
        © 2025 AgriRent. All Rights Reserved.
      </footer>
    </div>
  );
}
