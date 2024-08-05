import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css"; // Ensure this CSS file has the necessary styles

function WithDrawals() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWithdrawals() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://localhost:3000/api/withdrawals",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setWithdrawals(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchWithdrawals();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="withdrawals-list">
      <h2>All Withdrawals</h2>
      {withdrawals.length === 0 ? (
        <p>No withdrawals found.</p>
      ) : (
        <ul>
          {withdrawals.map((withdrawal) => (
            <li key={withdrawal._id} className="withdrawal-item">
              <p>
                <b>User:</b> {withdrawal.userId.username}
              </p>
              <p>
                <b>Email:</b> {withdrawal.userId.email}
              </p>
              <p>
                <b>Class:</b> {withdrawal.classId.title}
              </p>
              <p>
                <b>Status:</b> {withdrawal.status}
              </p>
              <p>
                <b>Requested At:</b>{" "}
                {new Date(withdrawal.requestedAt).toLocaleDateString()}
              </p>
              <div>
                <button className="button accept">Accept</button>
                <button className="button reject">Reject</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WithDrawals;
