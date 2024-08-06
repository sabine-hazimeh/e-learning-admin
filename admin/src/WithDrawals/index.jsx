import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchWithdrawalsStart,
  fetchWithdrawalsSuccess,
  fetchWithdrawalsFailure,
  acceptWithdrawal,
  rejectWithdrawal,
} from "../data-source/redux/WithDrawals/slice";
import axios from "axios";
import "./style.css";

function WithDrawals() {
  const dispatch = useDispatch();
  const { withdrawals, isLoading, error } = useSelector(
    (state) => state.withdrawals
  );

  useEffect(() => {
    async function fetchWithdrawals() {
      dispatch(fetchWithdrawalsStart());
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

        dispatch(fetchWithdrawalsSuccess(response.data));
      } catch (err) {
        dispatch(fetchWithdrawalsFailure(err.message));
      }
    }

    fetchWithdrawals();
  }, [dispatch]);

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:3000/api/withdrawals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(rejectWithdrawal(id));
    } catch (err) {
      dispatch(fetchWithdrawalsFailure(err.message));
    }
  };

  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `http://localhost:3000/api/withdrawals/accept/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(acceptWithdrawal(id));
    } catch (err) {
      dispatch(fetchWithdrawalsFailure(err.message));
    }
  };

  if (isLoading) return <p>Loading...</p>;
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
              <div className="buttons">
                <button
                  className="button accept"
                  onClick={() => handleAccept(withdrawal._id)}
                >
                  Accept
                </button>
                <button
                  className="button reject"
                  onClick={() => handleReject(withdrawal._id)}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WithDrawals;
