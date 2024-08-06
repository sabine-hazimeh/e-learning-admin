import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/files",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("File uploaded successfully");
    } catch (error) {
      toast.error("File upload failed");
      console.error(
        "Error uploading file:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="file-upload-container">
      <h2>Upload a File</h2>
      <input type="file" className="file-input" onChange={handleFileChange} />
      <button className="upload-button" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}

export default FileUpload;
