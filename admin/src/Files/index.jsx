import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";

function FileUpload() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { classId } = useParams();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("classId", classId);

    try {
      await axios.post("http://localhost:3000/api/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("File uploaded successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to upload file");
    }
  };

  return (
    <div className="file-upload-container">
      <h2>Upload new File </h2>
      <input type="file" className="file-input" onChange={handleFileChange} />
      <button className="upload-button" onClick={handleFileUpload}>
        Upload
      </button>
      <ToastContainer />
    </div>
  );
}

export default FileUpload;
