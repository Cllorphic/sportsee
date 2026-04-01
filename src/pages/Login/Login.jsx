import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    const fakeToken = "123456";
    login(fakeToken);
    navigate("/dashboard");
  };

  return (
    <div className="login">
      <h1>Connexion</h1>

      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Mot de passe" />

      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
}