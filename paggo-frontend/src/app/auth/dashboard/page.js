"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import './dashboard.css';

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/dashboard');
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
    setMessage('');
  };

  const handleSaveFile = async () => {
    if (!file) {
      setMessage('Select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/dashboard/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('File saved to database');
      setFile(null);
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Error saving file');
    }
  };

  return (
    <div className="index-background">
      <div className="leftSideText">
        <h1 >Your History</h1>
        <div className="file-list">
          {files.length === 0 && <p>No files found.</p>}
          {files.map((file, index) => (
            <div key={index} className="file-item">
              <div className="file-indicator"></div>
              <div className="file-name">{file.name || "document-name"}</div>
              <div className="file-date">{new Date(file.upload_date).toLocaleDateString("en-US")}</div>
            </div>
          ))}
          <div className="last-invoices">Last ones</div>
        </div>
      </div>
      
      <div className="rightSide">
        <input type="file" onChange={handleFileChange} />
        <button className="button" onClick={handleSaveFile}>Save file on database</button>
        <button className="button" onClick={() => setFile(null)}>Upload new one</button>
        <p>{message}</p>
      </div>
    </div>
  );
}
