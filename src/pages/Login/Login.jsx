import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [fading, setFading] = useState(false);

  const handleLogin = () => {
    setFading(true);
    setTimeout(() => {
      const fakeToken = "123456";
      login(fakeToken);
      navigate("/dashboard");
    }, 500);
  };

  return (
    <div className={`login-page ${fading ? "fade-out" : "fade-in"}`}>
      {/* LEFT PANEL */}
      <div className="login-left">
        <div className="login-logo">
          <span className="logo-icon">📊</span>
          <span className="logo-text">SPORTSEE</span>
        </div>

        <div className="login-card">
          <h1 className="login-tagline">
            Transformez<br />vos stats en résultats
          </h1>

          <h2 className="login-title">Se connecter</h2>

          <div className="login-field">
            <label>Adresse email</label>
            <input type="email" placeholder="" />
          </div>

          <div className="login-field">
            <label>Mot de passe</label>
            <input type="password" placeholder="" />
          </div>

          <button className="login-btn" onClick={handleLogin}>
            Se connecter
          </button>

          <p className="login-forgot">Mot de passe oublié ?</p>
        </div>
      </div>

      {/* RIGHT PANEL — photo running */}
      <div className="login-right">
        <img
          src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80"
          alt="runners"
          className="login-photo"
        />
      </div>
    </div>
  );
}