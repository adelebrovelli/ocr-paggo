"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/dashboard/upload');
        axios.defaults.withCredentials = true;

        if (Array.isArray(response.data)) {
          setFiles(response.data);
        } else {
          setMessage('No files found.');
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
    fetchFiles();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3001/dashboard/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('File successfully uploaded');
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Error uploading file');
    }
  };

  return (
    <div>
      <h1>Your History</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Save file on database</button>
      <p>{message}</p>
      <h2>Uploaded Files</h2>
    <ul>
    {Array.isArray(files) && files.map((file, index) => (
          <li key={index}>
            <p><strong>Date:</strong> {new Date(file.upload_date).toLocaleString()}</p>
            <p><strong>Extracted Text:</strong> {file.text}</p>
          </li>
        ))}
    </ul>
    </div>
  );
}
