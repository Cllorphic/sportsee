import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { mockUser, profileStats } from "../../mocks/data";
import "./profile.css";

// Simule un store indexé par id — remplacé par une API en production
const USERS_BY_ID = {
  "1": mockUser,
  "2": { ...mockUser, firstName: "Clara", lastName: "Dupont", age: 27, weight: 55 },
};

export default function Profile() {
  // `id` est maintenant UTILISÉ pour le lookup → warning résolu
  const { id } = useParams();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
    // TODO production : fetch(`/api/users/${id}`) ici avec id en dépendance
  }, []);

  // id est lu ici → ESLint content
  const user = USERS_BY_ID[id] ?? mockUser;

  const heightFormatted = `${Math.floor(user.height / 100)}m${String(
    user.height % 100
  ).padStart(2, "0")}`;

  return (
    <div className="app-container">
      <Header />

      <main className={`profile-page ${visible ? "fade-in" : "fade-start"}`}>
        <div className="profile-layout">

          <div className="profile-left">
            <div className="card identity-card">
              <img src={user.profilePicture} alt={user.firstName} className="identity-avatar" />
              <div>
                <h2 className="identity-name">{user.firstName} {user.lastName}</h2>
                <p className="identity-since">Membre depuis le {user.memberSince}</p>
              </div>
            </div>

            <div className="card profile-detail-card">
              <h3 className="profile-detail-title">Votre profil</h3>
              <hr className="profile-detail-divider" />
              <ul className="profile-detail-list">
                <li><span className="detail-label">Âge :</span> {user.age}</li>
                <li><span className="detail-label">Genre :</span> {user.gender}</li>
                <li><span className="detail-label">Taille :</span> {heightFormatted}</li>
                <li><span className="detail-label">Poids :</span> {user.weight}kg</li>
              </ul>
            </div>
          </div>

          <div className="profile-right">
            <h2 className="stats-title">Vos statistiques</h2>
            <p className="stats-since">depuis le {user.memberSince}</p>
            <div className="stats-grid">
              {profileStats.map((s, i) => (
                <div key={i} className="stat-tile" style={{ animationDelay: `${0.05 + i * 0.07}s` }}>
                  <p className="tile-label">{s.label}</p>
                  <p className="tile-value">{s.value}<span className="tile-unit"> {s.unit}</span></p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}