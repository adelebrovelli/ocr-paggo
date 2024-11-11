import './globals.css';
import './index.css';

export default function Home() {
    return (
      <div className="index-background">
        <div className="leftSideText">
          <img src="/logoPaggo.png" alt="Logo da Paggo"/>
          <p className="sentence">Your number one invoice manager.</p>
          <footer>Paggo © 2024</footer>
        </div>
        <div className="rightSide">
          <h1>Welcome.</h1>
          <button className="button" href="#paggo-frontend/src/app/login/page.js">Login</button>
          <p>or</p>
          <button className="button" href="#">Sign up</button>
        </div>
      </div>
    );
}
