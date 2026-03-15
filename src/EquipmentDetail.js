import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./style.css";

const USER_ID = 1;

export default function EquipmentDetail() {
  const { id } = useParams();

  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);

  useEffect(() => {
    fetch(`http://localhost/agrirent-react/api/get_equipment.php?id=${id}`)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to fetch equipment.");
        }
        return r.json();
      })
      .then((data) => {
        setEquipment(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load equipment.");
        setLoading(false);
      });
  }, [id]);

  const handleBookNow = async () => {
    if (!equipment) return;

    const confirmed = window.confirm("Do you want to confirm this booking?");
    if (!confirmed) return;

    setInfoMessage("Booking in progress...");

    const today = new Date().toISOString().slice(0, 10);

    const bookingData = {
      equipment_id: equipment.id || id,
      user_id: USER_ID,
      start_date: today,
      end_date: today,
      total_price: parseFloat(equipment.price || 0),
    };

    try {
      const response = await fetch(
        "http://localhost/agrirent-react/api/save_booking.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setInfoMessage(`Booking confirmed! Booking ID: ${data.bookingId}`);
      } else {
        setInfoMessage(
          `Booking failed: ${data.message || "Unknown error occurred."}`
        );
      }
    } catch (err) {
      console.error("Booking API Error:", err);
      setInfoMessage("Booking failed due to a network error.");
    }
  };

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error || !equipment)
    return <div className="error-container">{error || "Equipment not found."}</div>;

  return (
    <div>
      {/* NAVBAR */}
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

      <div className="booking-container">
        <div className="booking-box">
          <p>Click the button below to confirm your booking.</p>

          <button className="book-btn" onClick={handleBookNow}>
            Confirm Booking
          </button>

          {infoMessage && <p className="info-message">{infoMessage}</p>}
        </div>
      </div>

      <footer className="footer">© 2025 AgriRent. All Rights Reserved.</footer>
    </div>
  );
}
