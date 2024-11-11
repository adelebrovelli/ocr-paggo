"use client"

import React, { useState } from 'react';
import './register.css'; 
import { register } from '/src/services/authService';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage(null); 
      try {
        const result = await register(name, email, password);
        console.log('Registration successful:', result);
        alert('Registration successful');
      } catch (error) {
        setErrorMessage(error); 
      }
    };
  
    return (
      <div className="index-background">
        <div className="leftSideText">
          <img src="/logoPaggo.png" alt="Logo da Paggo"/>
          <p className="sentence">Your number one invoice manager.</p>
          <footer>Paggo © 2024</footer>
        </div>
        <div className="rightSide"> 
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name*"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email*"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password*"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="input-field submit-button">Sign up</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
    );
  }
