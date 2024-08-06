import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEnrollmentsStart,
  fetchEnrollmentsSuccess,
  fetchEnrollmentsFailure,
} from "../data-source/redux/StudentsSlice/slice";
import "./style.css";

function Students() {
  const dispatch = useDispatch();
  const { enrollments, isLoading, error } = useSelector(
    (state) => state.students
  );

  useEffect(() => {
    async function fetchEnrollments() {
      dispatch(fetchEnrollmentsStart());
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
        dispatch(fetchEnrollmentsSuccess(data));
      } catch (error) {
        dispatch(fetchEnrollmentsFailure(error.message));
      }
    }

    fetchEnrollments();
  }, [dispatch]);

  return (
    <div className="students-list">
      <h2>All Students Enrolled in Courses</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
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
