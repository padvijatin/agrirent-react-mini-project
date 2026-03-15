import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";   

export default function Equipment() {
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    fetch("http://localhost/agrirent-react/api/get_equipments.php")
      .then((r) => r.json())
      .then(setEquipments)
      .catch(() => setEquipments([]));
  }, []);

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

      <div className="container" style={{ marginTop: "40px", minHeight: "70vh" }}>
        <h2>All Available Equipments</h2>

        <div className="card-container">
          {equipments.length === 0 ? (
            <p style={{ textAlign: "center", width: "100%" }}>
              No equipment available at the moment.
            </p>
          ) : (
            equipments.map((eq) => (
              <div className="card" key={eq.id}>
                <img
                  src={`http://localhost/agrirent-react/uploads/${eq.image}`}
                  alt={eq.name}
                  onError={(e) =>
                    (e.target.src =
                      "http://localhost/agrirent-react/uploads/placeholder.png")
                  }
                />
                <h1>{eq.name}</h1>
                <p>{eq.category}</p>
                <p>{eq.description}</p>
                <div className="price">
                  ₹{parseFloat(eq.price || 0).toFixed(2)}
                </div>
                <Link to={`/equipment/detail/${eq.id}`} className="btn">
                  View / Book
                </Link>
              </div>
            ))
          )}
        </div>
      </div>

      <footer className="footer">
        <p>© 2025 AgriRent. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
