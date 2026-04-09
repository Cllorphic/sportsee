// ─────────────────────────────────────────────
// Service mock — même interface que apiService.js
// Activé quand VITE_USE_MOCK=true
// ─────────────────────────────────────────────

const mockProfile = {
  firstName: "Sophie",
  lastName: "Martin",
  age: 29,
  gender: "Femme",
  weight: 58,
  height: 168,
  profilePicture:
    "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=120&h=120&fit=crop&q=80",
  createdAt: "14/06/2023",
};

const mockRunningSessions = [
  { date: "2025-01-04", distance: 5.8, duration: 38, heartRate: { min: 140, max: 178, average: 163 }, caloriesBurned: 422 },
  { date: "2025-01-09", distance: 6.4, duration: 42, heartRate: { min: 140, max: 176, average: 163 }, caloriesBurned: 468 },
  { date: "2025-01-12", distance: 7.5, duration: 50, heartRate: { min: 138, max: 178, average: 162 }, caloriesBurned: 532 },
  { date: "2025-01-19", distance: 5.1, duration: 34, heartRate: { min: 141, max: 177, average: 165 }, caloriesBurned: 378 },
  { date: "2025-01-25", distance: 4.8, duration: 32, heartRate: { min: 143, max: 179, average: 166 }, caloriesBurned: 352 },
  { date: "2025-02-02", distance: 6.2, duration: 40, heartRate: { min: 142, max: 177, average: 164 }, caloriesBurned: 455 },
  { date: "2025-02-08", distance: 4.5, duration: 30, heartRate: { min: 144, max: 180, average: 167 }, caloriesBurned: 335 },
  { date: "2025-02-15", distance: 9.2, duration: 62, heartRate: { min: 138, max: 179, average: 161 }, caloriesBurned: 645 },
  { date: "2025-02-22", distance: 5.5, duration: 36, heartRate: { min: 142, max: 178, average: 165 }, caloriesBurned: 398 },
  { date: "2025-03-01", distance: 7.8, duration: 50, heartRate: { min: 140, max: 178, average: 162 }, caloriesBurned: 545 },
  { date: "2025-03-09", distance: 10.5, duration: 68, heartRate: { min: 136, max: 179, average: 159 }, caloriesBurned: 720 },
  { date: "2025-03-15", distance: 6.8, duration: 44, heartRate: { min: 141, max: 178, average: 163 }, caloriesBurned: 485 },
  { date: "2025-03-22", distance: 5.3, duration: 34, heartRate: { min: 142, max: 178, average: 165 }, caloriesBurned: 382 },
  { date: "2025-03-27", distance: 11.0, duration: 72, heartRate: { min: 135, max: 179, average: 158 }, caloriesBurned: 755 },
  { date: "2025-04-06", distance: 7.2, duration: 46, heartRate: { min: 139, max: 179, average: 163 }, caloriesBurned: 495 },
  { date: "2025-04-13", distance: 9.8, duration: 65, heartRate: { min: 138, max: 180, average: 161 }, caloriesBurned: 680 },
  { date: "2025-04-20", distance: 4.5, duration: 30, heartRate: { min: 143, max: 180, average: 167 }, caloriesBurned: 328 },
  { date: "2025-04-27", distance: 6.7, duration: 43, heartRate: { min: 141, max: 178, average: 163 }, caloriesBurned: 472 },
  { date: "2025-05-04", distance: 8.3, duration: 54, heartRate: { min: 139, max: 179, average: 162 }, caloriesBurned: 578 },
  { date: "2025-05-11", distance: 10.2, duration: 68, heartRate: { min: 137, max: 180, average: 160 }, caloriesBurned: 705 },
  { date: "2025-05-18", distance: 7.0, duration: 45, heartRate: { min: 140, max: 178, average: 163 }, caloriesBurned: 490 },
  { date: "2025-05-29", distance: 6.5, duration: 42, heartRate: { min: 141, max: 178, average: 164 }, caloriesBurned: 460 },
  { date: "2025-06-07", distance: 9.5, duration: 62, heartRate: { min: 138, max: 180, average: 161 }, caloriesBurned: 665 },
  { date: "2025-06-15", distance: 4.5, duration: 29, heartRate: { min: 144, max: 179, average: 167 }, caloriesBurned: 325 },
  { date: "2025-06-22", distance: 11.2, duration: 72, heartRate: { min: 135, max: 180, average: 159 }, caloriesBurned: 765 },
];

// Statistiques calculées depuis les sessions mock
const totalDistance = parseFloat(
  mockRunningSessions.reduce((s, r) => s + r.distance, 0).toFixed(1)
);
const totalDuration = mockRunningSessions.reduce((s, r) => s + r.duration, 0);
const totalSessions = mockRunningSessions.length;

// ─────────────────────────────────────────────
// Simule un délai réseau (optionnel, rend le mock plus réaliste)
// ─────────────────────────────────────────────
const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

// ─────────────────────────────────────────────
// Exports — même signature que apiService.js
// ─────────────────────────────────────────────

export async function loginUser(username, password) {
  await delay();
  if (username === "sophiemartin" && password === "password123") {
    return { userId: "user123" };
  }
  throw new Error("Identifiants incorrects");
}

export async function getUserInfo() {
  await delay();
  return {
    profile: { ...mockProfile },
    statistics: { totalDistance, totalDuration, totalSessions },
    weeklyGoal: 6,
  };
}

export async function getUserActivity(startWeek, endWeek) {
  await delay();
  const start = new Date(startWeek);
  const end = new Date(endWeek);

  return mockRunningSessions
    .filter((s) => {
      const d = new Date(s.date);
      return d >= start && d <= end;
    })
    .map((s) => ({ ...s }));
}