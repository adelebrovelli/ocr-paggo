"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import './login.css'; 
import { login } from '/src/services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null); 

    try {
      const result = await login(email, password);
      alert('Login successful');
      //redirecionar
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid credentials. Please check your email and password.');
      } else if (error.response && error.response.status === 400) {
        setErrorMessage('Email and password are required.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="index-background">
      <div className="leftSideText">
        <Link href="/"> 
        <img src="/logoPaggo.png" alt="Logo da Paggo"/>
        </Link>
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
          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}
