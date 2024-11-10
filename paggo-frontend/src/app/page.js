import './globals.css';
import './index.css';

export default function Home() {
    return (
      <div className="index-background">
        <div className="leftSideText">
          <img src="logoPaggo.png" alt="Logo da Paggo"/>
          <p styles="width:150px; font-size:21px; height: 19px;">Your number one invoice manager.</p>
          <footer>Paggo © 2024</footer>
        </div>
        <div className="rightSide">
          <h1 styles="width: 196px; font-size: 45px; height: 47px; color:#ffffff;">Welcome</h1>
          <button className="button">Login</button>
          <p styles="width: 28px; font-size: 27px; height: 31px; color:#ffffff;">or</p>
          <button className="button">Sign up</button>
        </div>
      </div>
    );
  }