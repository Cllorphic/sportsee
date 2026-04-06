import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../services/apiService";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [fading, setFading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    setFading(true);

    try {
      const data = await loginUser(username.trim(), password.trim());
      login(data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setFading(false);
      setError("Nom d'utilisateur ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`login-page ${fading ? "fade-out" : "fade-in"}`}>

      <div className="login-left">
        <div className="login-logo">
          <span className="logo-icon">📊</span>
          <span className="logo-text">SPORTSEE</span>
        </div>

        <div className="login-content">
          <div className="login-card">
            <h1 className="login-tagline">
              Transformez<br />vos stats en résultats
            </h1>

            <h2 className="login-title">Se connecter</h2>

            <div className="login-field">
              <label>Nom d'utilisateur</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="login-field">
              <label>Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p style={{ color: "red", fontSize: "14px", margin: "0 0 8px" }}>
                {error}
              </p>
            )}

            <button
              className="login-btn"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>

            <p className="login-forgot">Mot de passe oublié ?</p>
          </div>
        </div>
      </div>

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