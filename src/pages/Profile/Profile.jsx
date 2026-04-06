import { useEffect, useState } from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { getUserInfo, getUserActivity } from "../../services/apiService";
import "./profile.css";

const ALL_START = "2025-01-01";
const ALL_END   = "2029-12-31";

// ─────────────────────────────────────────────────────────────────
// Avatar avec fallback initiales si l'image ne charge pas
// ─────────────────────────────────────────────────────────────────
function ProfileAvatar({ src, firstName, lastName, className = "identity-avatar" }) {
  const [imgError, setImgError] = useState(false);
  const initials = `${(firstName || "?")[0]}${(lastName || "?")[0]}`.toUpperCase();

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={`${firstName} ${lastName}`}
        className={className}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      className={`${className} identity-avatar-fallback`}
      aria-label={`${firstName} ${lastName}`}
    >
      {initials}
    </div>
  );
}

export default function Profile() {
  const [visible, setVisible]   = useState(false);
  const [userInfo, setUserInfo] = useState(null);  // { profile, statistics, weeklyGoal }
  const [sessions, setSessions] = useState([]);     // tableau normalisé
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    Promise.all([
      getUserInfo(),
      getUserActivity(ALL_START, ALL_END),
    ])
      .then(([info, allSessions]) => {
        setUserInfo(info);
        setSessions(allSessions);
      })
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger le profil.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="app-container">
        <p style={{ padding: 48 }}>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <p style={{ padding: 48, color: "red" }}>{error}</p>
      </div>
    );
  }

  const { profile, statistics } = userInfo;

  // ── Calculs depuis les sessions réelles ──────────────────────────

  const totalCalories = sessions.reduce((acc, s) => acc + (s.caloriesBurned ?? 0), 0);

  // Jours de repos = jours sans session dans les 30 derniers jours
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  const recentDatesWithSession = new Set(
    sessions
      .filter((s) => new Date(s.date) >= cutoff)
      .map((s) => s.date)
  );
  const restDays = 30 - recentDatesWithSession.size;

  // Formatage taille : 165 → "1m65"
  const heightFormatted = profile.height
    ? `${Math.floor(profile.height / 100)}m${String(profile.height % 100).padStart(2, "0")}`
    : "—";

  const totalDurationH   = Math.floor(statistics.totalDuration / 60);
  const totalDurationMin = statistics.totalDuration % 60;

  const profileStats = [
    {
      label: "Temps total couru",
      value: `${totalDurationH}h`,
      unit:  `${totalDurationMin}min`,
    },
    {
      label: "Calories brûlées",
      value: totalCalories.toLocaleString("fr-FR"),
      unit:  "cal",
    },
    {
      label: "Distance totale parcourue",
      value: parseFloat(statistics.totalDistance).toLocaleString("fr-FR"),
      unit:  "km",
    },
    {
      label: "Jours de repos (30 derniers jours)",
      value: String(restDays),
      unit:  "jours",
    },
    {
      label: "Nombre de sessions",
      value: String(statistics.totalSessions),
      unit:  "sessions",
    },
  ];

  return (
    <div className="app-container">
      <Header />

      <main className={`profile-page ${visible ? "fade-in" : "fade-start"}`}>
        <div className="profile-layout">

          {/* ── Colonne gauche ── */}
          <div className="profile-left">
            <div className="card identity-card">
              <ProfileAvatar
                src={profile.profilePicture}
                firstName={profile.firstName}
                lastName={profile.lastName}
              />
              <div>
                <h2 className="identity-name">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="identity-since">Membre depuis le {profile.createdAt}</p>
              </div>
            </div>

            <div className="card profile-detail-card">
              <h3 className="profile-detail-title">Votre profil</h3>
              <hr className="profile-detail-divider" />
              <ul className="profile-detail-list">
                {profile.age    && <li><span className="detail-label">Âge :</span> {profile.age}</li>}
                {profile.gender && <li><span className="detail-label">Genre :</span> {profile.gender}</li>}
                {profile.height && <li><span className="detail-label">Taille :</span> {heightFormatted}</li>}
                {profile.weight && <li><span className="detail-label">Poids :</span> {profile.weight} kg</li>}
              </ul>
            </div>
          </div>

          {/* ── Colonne droite ── */}
          <div className="profile-right">
            <h2 className="stats-title">Vos statistiques</h2>
            <p className="stats-since">depuis le {profile.createdAt}</p>
            <div className="stats-grid">
              {profileStats.map((s, i) => (
                <div
                  key={i}
                  className="stat-tile"
                  style={{ animationDelay: `${0.05 + i * 0.07}s` }}
                >
                  <p className="tile-label">{s.label}</p>
                  <p className="tile-value">
                    {s.value}<span className="tile-unit"> {s.unit}</span>
                  </p>
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