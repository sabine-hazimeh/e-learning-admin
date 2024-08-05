import React, { useState, useEffect } from "react";
import "./style.css";

function Students() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    async function fetchEnrollments() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          "http://localhost:3000/api/all-enrollments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setEnrollments(data);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      }
    }

    fetchEnrollments();
  }, []);

  return (
    <div className="students-list">
      <h2>All Students Enrolled in Courses</h2>
      <ul>
        {enrollments.length > 0 ? (
          enrollments.map((enrollment) => (
            <li key={enrollment._id}>
              <strong>{enrollment.userId.username}</strong> -{" "}
              {enrollment.userId.email} -
              <strong>{enrollment.classId.title}</strong>
            </li>
          ))
        ) : (
          <li>No enrollments found.</li>
        )}
      </ul>
    </div>
  );
}

export default Students;
