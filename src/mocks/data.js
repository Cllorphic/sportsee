export const mockUser = {
  firstName: "Sophie",
  lastName: "Martin",
  age: 29,
  gender: "Femme",
  weight: 58,
  height: 168,
  memberSince: "14 juin 2023",
  profilePicture:
    "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=120&h=120&fit=crop&q=80",
};

export const mockStats = {
  dashboardDistanceKm: 312,
  lifetimeDistanceKm: 2250.2,
  totalSessions: 348,
  totalDurationMin: 14625,
  caloriesBurned: 25000,
  restDays: 9,
};

export const DATE_RANGES = [
  {
    id: "may-jun",
    label: "28 mai – 25 juin",
    activityLabel: "28 mai – 25 juin",
    bpmLabel: "28 mai – 04 juin",
    weekLabel: "Du 23/05/2025 au 25/06/2025",
  },
  {
    id: "jun-jul",
    label: "23 juin – 30 juin",
    activityLabel: "23 juin – 30 juin",
    bpmLabel: "23 juin – 30 juin",
    weekLabel: "Du 23/06/2025 au 30/06/2025",
  },
  {
    id: "jul-aug",
    label: "01 juil – 28 juil",
    activityLabel: "01 juil – 28 juil",
    bpmLabel: "01 juil – 07 juil",
    weekLabel: "Du 01/07/2025 au 28/07/2025",
  },
];

export const DEFAULT_RANGE_ID = "may-jun";

export const weeklyDataByRange = {
  "may-jun": [
    { week: "S1", km: 18 },
    { week: "S2", km: 25 },
    { week: "S3", km: 14 },
    { week: "S4", km: 30 },
  ],
  "jun-jul": [
    { week: "S1", km: 20 },
    { week: "S2", km: 22 },
    { week: "S3", km: 17 },
    { week: "S4", km: 26 },
  ],
  "jul-aug": [
    { week: "S1", km: 15 },
    { week: "S2", km: 28 },
    { week: "S3", km: 21 },
    { week: "S4", km: 24 },
  ],
};

export const bpmDataByRange = {
  "may-jun": [
    { day: "Lun", min: 140, max: 170, avg: 165 },
    { day: "Mar", min: 142, max: 175, avg: 168 },
    { day: "Mer", min: 145, max: 180, avg: 170 },
    { day: "Jeu", min: 143, max: 172, avg: 166 },
    { day: "Ven", min: 138, max: 168, avg: 169 },
    { day: "Sam", min: 145, max: 165, avg: 162 },
    { day: "Dim", min: 140, max: 178, avg: 167 },
  ],
  "jun-jul": [
    { day: "Lun", min: 138, max: 168, avg: 160 },
    { day: "Mar", min: 140, max: 172, avg: 163 },
    { day: "Mer", min: 143, max: 177, avg: 166 },
    { day: "Jeu", min: 141, max: 170, avg: 162 },
    { day: "Ven", min: 136, max: 165, avg: 158 },
    { day: "Sam", min: 142, max: 162, avg: 159 },
    { day: "Dim", min: 138, max: 175, avg: 164 },
  ],
  "jul-aug": [
    { day: "Lun", min: 145, max: 175, avg: 169 },
    { day: "Mar", min: 147, max: 178, avg: 171 },
    { day: "Mer", min: 148, max: 182, avg: 173 },
    { day: "Jeu", min: 146, max: 174, avg: 168 },
    { day: "Ven", min: 141, max: 171, avg: 172 },
    { day: "Sam", min: 148, max: 168, avg: 165 },
    { day: "Dim", min: 143, max: 180, avg: 170 },
  ],
};

export const activityByRange = {
  "may-jun": [
    { date: "2025-05-28", distance: 5.0, duration: 30, caloriesBurned: 300 },
    { date: "2025-06-04", distance: 6.2, duration: 35, caloriesBurned: 350 },
    { date: "2025-06-11", distance: 4.8, duration: 28, caloriesBurned: 280 },
    { date: "2025-06-18", distance: 7.1, duration: 40, caloriesBurned: 420 },
  ],
  "jun-jul": [
    { date: "2025-06-23", distance: 5.0, duration: 30, caloriesBurned: 300 },
    { date: "2025-06-24", distance: 6.2, duration: 35, caloriesBurned: 350 },
    { date: "2025-06-25", distance: 4.8, duration: 28, caloriesBurned: 280 },
    { date: "2025-06-26", distance: 7.1, duration: 40, caloriesBurned: 420 },
    { date: "2025-06-28", distance: 3.9, duration: 25, caloriesBurned: 250 },
    { date: "2025-06-30", distance: 6.5, duration: 37, caloriesBurned: 370 },
    { date: "2025-07-01", distance: 3.5, duration: 22, caloriesBurned: 210 },
  ],
  "jul-aug": [
    { date: "2025-07-01", distance: 6.0, duration: 34, caloriesBurned: 340 },
    { date: "2025-07-07", distance: 7.5, duration: 42, caloriesBurned: 450 },
    { date: "2025-07-14", distance: 5.5, duration: 31, caloriesBurned: 310 },
    { date: "2025-07-21", distance: 8.2, duration: 46, caloriesBurned: 490 },
    { date: "2025-07-28", distance: 4.8, duration: 27, caloriesBurned: 270 },
  ],
};

export const weeklyGoal = 6;

export const profileStats = [
  {
    label: "Temps total couru",
    value: `${Math.floor(mockStats.totalDurationMin / 60)}h`,
    unit: `${mockStats.totalDurationMin % 60}min`,
  },
  {
    label: "Calories brûlées",
    value: mockStats.caloriesBurned.toLocaleString("fr-FR"),
    unit: "cal",
  },
  {
    label: "Distance totale parcourue",
    value: mockStats.lifetimeDistanceKm.toLocaleString("fr-FR"),
    unit: "km",
  },
  {
    label: "Nombre de jours de repos",
    value: String(mockStats.restDays),
    unit: "jours",
  },
  {
    label: "Nombre de sessions",
    value: String(mockStats.totalSessions),
    unit: "sessions",
  },
];