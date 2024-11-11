import Link from 'next/link';
import './globals.css';
import './/index.css';

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
          <Link href="/auth/login">
      <button className="button">Login</button>
          </Link>
          <p>or</p>
          <Link href="/auth/register">
      <button className="button">Sign up</button>
          </Link>
        </div>
      </div>
    );
}
