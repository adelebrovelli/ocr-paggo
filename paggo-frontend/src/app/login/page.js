import React from 'react';
import './login.css';

export default function Login() {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form">
        <input type="text" placeholder="Username" className="input-field" />
        <input type="password" placeholder="Password" className="input-field" />
        <button type="submit" className="input-field submit-button">
          Login
        </button>
      </form>
    </div>
  );
}
