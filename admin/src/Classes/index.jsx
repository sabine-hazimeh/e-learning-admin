// src/components/Classes.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClassesStart,
  fetchClassesSuccess,
  fetchClassesFailure,
} from "../data-source/redux/ClassesSlice/slice";
import axios from "axios";
import "./style.css";
import { Link } from "react-router-dom";

function Classes() {
  const dispatch = useDispatch();
  const { classes, isLoading, error } = useSelector((state) => state.classes);

  useEffect(() => {
    const fetchClasses = async () => {
      dispatch(fetchClassesStart());
      try {
        const response = await axios.get("http://localhost:3000/api/classes");
        dispatch(fetchClassesSuccess(response.data));
      } catch (error) {
        dispatch(fetchClassesFailure(error.message));
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading classes...</p>;
  }

  if (error) {
    return <p>Error loading classes: {error}</p>;
  }

  return (
    <div className="classes-container">
      <h1>Classes</h1>
      <div className="classes-grid">
        {classes.map((course) => (
          <div key={course._id} className="course-card">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p>Instructor: {course.instructor.name}</p>
            <p>
              Start Date:{" "}
              {new Date(course.schedule.startDate).toLocaleDateString()}
            </p>
            <p>
              End Date: {new Date(course.schedule.endDate).toLocaleDateString()}
            </p>
            <Link to="/files">
              <button className="enroll-button">Add File</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Classes;
