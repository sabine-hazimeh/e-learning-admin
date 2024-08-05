import React, { useState } from "react";
import axios from "axios";
import "./style.css";

function Classes() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    schedule: {
      startDate: "",
      endDate: "",
      timings: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      schedule: {
        ...prevState.schedule,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/classes",
        formData
      );
      alert("Class created successfully!");
      setFormData({
        title: "",
        description: "",
        instructor: "",
        schedule: {
          startDate: "",
          endDate: "",
          timings: "",
        },
      });
    } catch (error) {
      alert("Error creating class: " + error.response.data.error);
    }
  };

  return (
    <div className="class-form-container">
      <h1>Create New Class</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="instructor">Instructor:</label>
          <input
            type="text"
            id="instructor"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.schedule.startDate}
            onChange={handleScheduleChange}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.schedule.endDate}
            onChange={handleScheduleChange}
          />
        </div>
        <div>
          <label htmlFor="timings">Timings:</label>
          <input
            type="text"
            id="timings"
            name="timings"
            value={formData.schedule.timings}
            onChange={handleScheduleChange}
          />
        </div>
        <button type="submit">Create Class</button>
      </form>
    </div>
  );
}

export default Classes;
