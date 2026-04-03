import { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./header.css";

export default function Header() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="main-header">
      <div className="header-logo">
        <span className="header-logo-icon">📊</span>
        <span className="header-logo-text">SPORTSEE</span>
      </div>

      <nav className="header-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/profile/1"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Mon profil
        </NavLink>
        <span className="nav-divider" />
        <button className="nav-logout" onClick={handleLogout}>
          Se déconnecter
        </button>
      </nav>
    </header>
  );
}