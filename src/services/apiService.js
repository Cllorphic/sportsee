// Les appels /api passent par le proxy Vite → http://localhost:8000
const BASE_URL = "/api";

async function apiFetch(endpoint) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }

  if (!response.ok) {
    throw new Error(`Erreur ${response.status} sur ${endpoint}`);
  }

  return response.json();
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/** "2025-01-01" → "01/01/2025" */
function formatDate(dateStr) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

// ─────────────────────────────────────────────
// Normaliseurs
// ─────────────────────────────────────────────

function normalizeUserInfo(raw) {
  // Fusionne les deux sources possibles pour couvrir
  // les deux formats de réponse du backend
  const info = { ...(raw.userInfos ?? {}), ...(raw.profile ?? {}) };
  const stats = raw.statistics ?? {};

  return {
    profile: {
      firstName:      info.firstName      ?? "",
      lastName:       info.lastName       ?? "",
      age:            info.age            ?? null,
      gender:         info.gender         ?? "",
      height:         info.height         ?? null,
      weight:         info.weight         ?? null,
      profilePicture: info.profilePicture ?? null,
      createdAt:      formatDate(info.createdAt),
    },
    statistics: {
      totalDistance:  parseFloat(stats.totalDistance ?? 0),
      totalDuration: stats.totalDuration ?? 0,
      totalSessions: stats.totalSessions ?? 0,
    },
    weeklyGoal: raw.weeklyGoal ?? raw.goal ?? 4,
  };
}

function normalizeActivity(raw) {
  const sessions = Array.isArray(raw)
    ? raw
    : (raw.sessions ?? raw.runningData ?? []);

  return sessions.map((s) => ({
    date:           s.date            ?? "",
    distance:       s.distance        ?? 0,
    duration:       s.duration        ?? 0,
    heartRate: {
      min:     s.heartRate?.min     ?? 0,
      max:     s.heartRate?.max     ?? 0,
      average: s.heartRate?.average ?? 0,
    },
    caloriesBurned: s.caloriesBurned  ?? 0,
  }));
}

// ─────────────────────────────────────────────
// Exports publics
// ─────────────────────────────────────────────

/**
 * Login — appel direct au backend (pas via proxy,
 * sinon ça entre en conflit avec la route React /login)
 */
export async function loginUser(username, password) {
  const response = await fetch("http://localhost:8000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) throw new Error("Identifiants incorrects");
  return response.json();
}

export const getUserInfo = () =>
  apiFetch("/user-info").then(normalizeUserInfo);

export const getUserActivity = (startWeek, endWeek) =>
  apiFetch(`/user-activity?startWeek=${startWeek}&endWeek=${endWeek}`)
    .then(normalizeActivity);