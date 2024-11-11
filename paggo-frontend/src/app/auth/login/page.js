"use client";

import React, { useState } from 'react';
import './login.css'; 
import { login } from '/src/services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(email, password);
      console.log('Login successful:', result);
      alert('Login successful');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Invalid credentials. Please check your email and password.');
      } else {
        alert('An error occurred. Please try again later.');
      }
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
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="input-field submit-button">Login
          </button>
        </form>
      </div>
    </div>
  );
}
