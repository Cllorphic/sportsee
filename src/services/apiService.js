const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

if (USE_MOCK) {
  console.info("[SportSee] Mode mock activé — les données proviennent de mockService.js");
}

import * as mockService from "../mocks/Mockservice";
// ─────────────────────────────────────────────
// Appels API réels
// ─────────────────────────────────────────────
const BASE_URL = "/api";

async function apiFetch(endpoint) {
  const token = sessionStorage.getItem("token");

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401 || response.status === 403) {
    sessionStorage.removeItem("token");
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
// Fonctions API réelles
// ─────────────────────────────────────────────

async function _loginUser(username, password) {
  const response = await fetch("http://localhost:8000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) throw new Error("Identifiants incorrects");
  return response.json();
}

const _getUserInfo = () =>
  apiFetch("/user-info").then(normalizeUserInfo);

const _getUserActivity = (startWeek, endWeek) =>
  apiFetch(`/user-activity?startWeek=${startWeek}&endWeek=${endWeek}`)
    .then(normalizeActivity);

// ─────────────────────────────────────────────
// Exports — bascule mock / API selon VITE_USE_MOCK
// ─────────────────────────────────────────────

export const loginUser       = USE_MOCK ? mockService.loginUser       : _loginUser;
export const getUserInfo     = USE_MOCK ? mockService.getUserInfo     : _getUserInfo;
export const getUserActivity = USE_MOCK ? mockService.getUserActivity : _getUserActivity;