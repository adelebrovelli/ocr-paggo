import React from 'react';
import './login.css'; 

export default function Register() {
  return (
    <div className="index-background">
        <div className="leftSideText">
          <img src="/logoPaggo.png" alt="Logo da Paggo"/>
          <p className="sentence">Your number one invoice manager.</p>
          <footer>Paggo © 2024</footer>
        </div>
        <div className="rightSide"> 
      <form className="login-form">
      <input type="text" placeholder="Name*" className="input-field" />
        <input type="text" placeholder="Email*" className="input-field" />
        <input type="password" placeholder="Password*" className="input-field" />
        <button type="submit" className="input-field submit-button">Sign up
        </button>
      </form>
      </div>
    </div>
  );
}
