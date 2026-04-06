import { useEffect, useState, useMemo } from "react";
import Header from "../../components/Header/Header.jsx";
import ActivityChart from "../../components/ActivityChart/ActivityChart.jsx";
import BpmChart from "../../components/BpmChart/BpmChart.jsx";
import DonutChart from "../../components/DonutChart/DonutChart.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { getUserInfo, getUserActivity } from "../../services/apiService";
import "./dashboard.css";

const ALL_START = "2025-01-01";
const ALL_END   = "2029-12-31";

// ─────────────────────────────────────────────────────────────────
// Avatar avec fallback initiales si l'image ne charge pas
// ─────────────────────────────────────────────────────────────────
function ProfileAvatar({ src, firstName, lastName }) {
  const [imgError, setImgError] = useState(false);
  const initials = `${(firstName || "?")[0]}${(lastName || "?")[0]}`.toUpperCase();

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={`${firstName} ${lastName}`}
        className="profile-avatar"
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      className="profile-avatar profile-avatar-fallback"
      aria-label={`${firstName} ${lastName}`}
    >
      {initials}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Génère des périodes de 28 jours glissants depuis les sessions.
// Retourne : [{ id, label, start, end }]
// ─────────────────────────────────────────────────────────────────
function buildPeriods(sessions) {
  if (!sessions.length) return [];

  const first = new Date(sessions[0].date);
  const last  = new Date(sessions[sessions.length - 1].date);

  const fmt = (d) =>
    d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });

  const periods = [];
  let cursor = new Date(first);

  while (cursor <= last) {
    const start = new Date(cursor);
    const end   = new Date(cursor);
    end.setDate(end.getDate() + 27); // fenêtre 28 jours

    periods.push({
      id:    `${start.toISOString().slice(0, 10)}_${end.toISOString().slice(0, 10)}`,
      label: `${fmt(start)} – ${fmt(end)}`,
      start,
      end,
    });

    cursor.setDate(cursor.getDate() + 28);
  }

  return periods;
}

export default function Dashboard() {
  const [visible, setVisible]               = useState(false);
  const [userInfo, setUserInfo]             = useState(null);
  const [sessions, setSessions]             = useState([]);
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState(null);
  const [selectedPeriodId, setSelectedPeriodId] = useState(null);

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

        const sorted = [...allSessions].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setSessions(sorted);

        // Période la plus récente sélectionnée par défaut
        const periods = buildPeriods(sorted);
        if (periods.length) {
          setSelectedPeriodId(periods[periods.length - 1].id);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger les données.");
      })
      .finally(() => setLoading(false));
  }, []);

  // ── Périodes disponibles ─────────────────────────────────────────
  const periods = useMemo(() => buildPeriods(sessions), [sessions]);

  // Pour PeriodNav : tableau d'ids + map id → label
  const periodIds    = useMemo(() => periods.map((p) => p.id), [periods]);
  const periodLabels = useMemo(
    () => Object.fromEntries(periods.map((p) => [p.id, p.label])),
    [periods]
  );

  // ── Sessions de la période sélectionnée ─────────────────────────
  const periodSessions = useMemo(() => {
    const period = periods.find((p) => p.id === selectedPeriodId);
    if (!period) return [];
    return sessions.filter((s) => {
      const d = new Date(s.date);
      return d >= period.start && d <= period.end;
    });
  }, [sessions, periods, selectedPeriodId]);

  // ── Km par semaine (période sélectionnée) ────────────────────────
  // Toujours 4 semaines (S1→S4), avec 0 km si pas de session
  const weeklyData = useMemo(() => {
    const period = periods.find((p) => p.id === selectedPeriodId);
    if (!period) return [];

    // Initialiser les 4 semaines à 0
    const weeks = {};
    for (let i = 1; i <= 4; i++) {
      weeks[`S${i}`] = { week: `S${i}`, km: 0, _n: i };
    }

    // Remplir avec les sessions de la période
    periodSessions.forEach((session) => {
      const diffDays = Math.floor(
        (new Date(session.date) - period.start) / (1000 * 60 * 60 * 24)
      );
      const weekNum = Math.min(Math.floor(diffDays / 7) + 1, 4);
      const weekKey = `S${weekNum}`;
      weeks[weekKey].km = parseFloat((weeks[weekKey].km + session.distance).toFixed(1));
    });

    return Object.values(weeks).sort((a, b) => a._n - b._n);
  }, [periodSessions, periods, selectedPeriodId]);

  // ── BPM par jour (période sélectionnée) ──────────────────────────
  const bpmData = useMemo(() => {
    const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    const byDay = {};
    periodSessions.forEach((s) => {
      const day = days[new Date(s.date).getDay()];
      byDay[day] = {
        day,
        min: s.heartRate.min,
        max: s.heartRate.max,
        avg: s.heartRate.average,
      };
    });
    return Object.values(byDay);
  }, [periodSessions]);

  // ── Totaux pour la période sélectionnée (stat-cards + donut) ─────
  const periodSessionsDone = periodSessions.length;
  const periodTotalKm = parseFloat(
    periodSessions.reduce((a, s) => a + s.distance, 0).toFixed(1)
  );
  const periodTotalMin = periodSessions.reduce((a, s) => a + s.duration, 0);

  // ── Rendu ─────────────────────────────────────────────────────────
  if (loading) {
    return <div className="app-container"><p style={{ padding: 48 }}>Chargement...</p></div>;
  }
  if (error) {
    return <div className="app-container"><p style={{ padding: 48, color: "red" }}>{error}</p></div>;
  }

  const { profile, statistics, weeklyGoal } = userInfo;

  // Label de la période sélectionnée pour la section basse
  const currentPeriodLabel = periodLabels[selectedPeriodId] ?? "";

  return (
    <div className="app-container">
      <Header />

      <main className={`dashboard ${visible ? "fade-in" : "fade-start"}`}>

        {/* ── Bannière profil ── */}
        <div className="profile-banner">
          <div className="profile-info">
            <ProfileAvatar
              src={profile.profilePicture}
              firstName={profile.firstName}
              lastName={profile.lastName}
            />
            <div>
              <h1 className="profile-name">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="profile-since">Membre depuis le {profile.createdAt}</p>
            </div>
          </div>
          <p className="profile-distance-label">Distance totale parcourue</p>
          <div className="distance-badge">
            <span className="distance-icon">🏃</span>
            <span className="distance-value">{statistics.totalDistance} km</span>
          </div>
        </div>

        {/* ── Charts avec navigation de période partagée ── */}
        <h2 className="section-title">Activité par période</h2>

        <div className="top-charts">
          <div className="card">
            <ActivityChart
              data={weeklyData}
              periods={periodIds}
              periodLabels={periodLabels}
              selectedPeriod={selectedPeriodId}
              onPeriodChange={setSelectedPeriodId}
            />
          </div>
          <div className="card">
            <BpmChart
              data={bpmData}
              periods={periodIds}
              periodLabels={periodLabels}
              selectedPeriod={selectedPeriodId}
              onPeriodChange={setSelectedPeriodId}
            />
          </div>
        </div>

        {/* ── Section période sélectionnée (donut + stats) ── */}
        <section className="week-section">
          <h2 className="section-title">Période sélectionnée</h2>
          <p className="section-subtitle">{currentPeriodLabel}</p>

          <div className="bottom-layout">
            <div className="card donut-card">
              <p className="donut-header-text">
                <span className="donut-count">x{periodSessionsDone}</span>
                <span className="donut-goal"> sur objectif de {weeklyGoal}</span>
              </p>
              <p className="donut-sub">Courses réalisées sur la période</p>
              <DonutChart done={periodSessionsDone} goal={weeklyGoal} />
            </div>

            <div className="stats-side">
              <div className="stat-card">
                <span className="stat-label">Durée d'activité</span>
                <span className="stat-value blue">
                  {periodTotalMin}<span className="stat-unit"> min</span>
                </span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Distance</span>
                <span className="stat-value orange">
                  {periodTotalKm}<span className="stat-unit"> km</span>
                </span>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}