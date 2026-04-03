import { useEffect, useState, useMemo } from "react";
import Header from "../../components/Header/Header.jsx";
import ActivityChart from "../../components/ActivityChart/ActivityChart.jsx";
import BpmChart from "../../components/BpmChart/BpmChart.jsx";
import DonutChart from "../../components/DonutChart/DonutChart.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import {
  mockUser,
  mockStats,
  DATE_RANGES,
  DEFAULT_RANGE_ID,
  weeklyDataByRange,
  bpmDataByRange,
  activityByRange,
  weeklyGoal,
} from "../../mocks/data";
import "./dashboard.css";

export default function Dashboard() {
  const [visible, setVisible] = useState(false);
  const [selectedRangeId, setSelectedRangeId] = useState(DEFAULT_RANGE_ID);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  // currentRange est mémorisé : ne se recalcule que si selectedRangeId change
  const currentRange = useMemo(
    () => DATE_RANGES.find((r) => r.id === selectedRangeId),
    [selectedRangeId]
  );

  // Données dérivées de la période — recalculées automatiquement
  const weeklyData  = weeklyDataByRange[selectedRangeId];
  const bpmData     = bpmDataByRange[selectedRangeId];
  const sessions    = activityByRange[selectedRangeId];

  const sessionsDone = sessions.length;
  const totalKm      = parseFloat(
    sessions.reduce((a, s) => a + s.distance, 0).toFixed(1)
  );
  const totalMin = sessions.reduce((a, s) => a + s.duration, 0);

  return (
    <div className="app-container">
      <Header />

      <main className={`dashboard ${visible ? "fade-in" : "fade-start"}`}>

        {/* ── Profile banner ── */}
        <div className="profile-banner">
          <div className="profile-info">
            {/* FIX BUG 6 : profilePicture est maintenant une URL Unsplash valide */}
            <img
              src={mockUser.profilePicture}
              alt={mockUser.firstName}
              className="profile-avatar"
            />
            <div>
              <h1 className="profile-name">
                {mockUser.firstName} {mockUser.lastName}
              </h1>
              <p className="profile-since">
                Membre depuis le {mockUser.memberSince}
              </p>
            </div>
          </div>

          <p className="profile-distance-label">Distance totale parcourue</p>

          <div className="distance-badge">
            <span className="distance-icon">🏃</span>
            {/* FIX BUG 2 : dashboardDistanceKm (312) au lieu de totalDistance (undefined) */}
            <span className="distance-value">
              {mockStats.dashboardDistanceKm} km
            </span>
          </div>
        </div>

        {/* ── Sélecteur de période ── */}
        <div className="range-selector">
          {DATE_RANGES.map((range) => (
            <button
              key={range.id}
              className={`range-btn ${selectedRangeId === range.id ? "active" : ""}`}
              onClick={() => setSelectedRangeId(range.id)}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* ── Charts ── */}
        <h2 className="section-title">Vos dernières performances</h2>

        <div className="top-charts">
          {/* FIX BUG 3 : dateLabel est une PROP → plus de variable module inutilisée */}
          <div className="card">
            <ActivityChart
              data={weeklyData}
              dateLabel={currentRange.activityLabel}
            />
          </div>
          <div className="card">
            <BpmChart
              data={bpmData}
              dateLabel={currentRange.bpmLabel}
            />
          </div>
        </div>

        {/* ── Cette semaine ── */}
        <section className="week-section">
          <h2 className="section-title">Cette semaine</h2>
          {/* FIX BUG 3 : weekLabel vient de la période sélectionnée → plus de hardcode */}
          <p className="section-subtitle">{currentRange.weekLabel}</p>

          <div className="bottom-layout">
            <div className="card donut-card">
              <p className="donut-header-text">
                <span className="donut-count">x{sessionsDone}</span>
                <span className="donut-goal"> sur objectif de {weeklyGoal}</span>
              </p>
              <p className="donut-sub">Courses hebdomadaires réalisées</p>
              <DonutChart done={sessionsDone} goal={weeklyGoal} />
            </div>

            <div className="stats-side">
              <div className="stat-card">
                <span className="stat-label">Durée d'activité</span>
                <span className="stat-value blue">
                  {totalMin}<span className="stat-unit"> minutes</span>
                </span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Distance</span>
                <span className="stat-value orange">
                  {totalKm}<span className="stat-unit"> kilomètres</span>
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