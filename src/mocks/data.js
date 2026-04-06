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
  lifetimeDistanceKm: 312,
  totalSessions: 348,
  totalDurationMin: 14625,
  caloriesBurned: 25000,
  restDays: 9,
};

export const DATE_RANGES = [
  {
    id: "jan-mar-2025",
    label: "Jan – Mar 2025",
    activityLabel: "Janvier – Mars 2025",
    bpmLabel: "Jan – Mar 2025",
    weekLabel: "Du 01/01/2025 au 31/03/2025",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
  },
  {
    id: "apr-jun-2025",
    label: "Avr – Juin 2025",
    activityLabel: "Avril – Juin 2025",
    bpmLabel: "Avr – Juin 2025",
    weekLabel: "Du 01/04/2025 au 30/06/2025",
    startDate: "2025-04-01",
    endDate: "2025-06-30",
  },
  {
    id: "jul-sep-2025",
    label: "Juil – Sep 2025",
    activityLabel: "Juillet – Septembre 2025",
    bpmLabel: "Juil – Sep 2025",
    weekLabel: "Du 01/07/2025 au 30/09/2025",
    startDate: "2025-07-01",
    endDate: "2025-09-30",
  },
  {
    id: "oct-dec-2025",
    label: "Oct – Déc 2025",
    activityLabel: "Octobre – Décembre 2025",
    bpmLabel: "Oct – Déc 2025",
    weekLabel: "Du 01/10/2025 au 31/12/2025",
    startDate: "2025-10-01",
    endDate: "2025-12-31",
  },
];

export const DEFAULT_RANGE_ID = "jan-mar-2025";

export const weeklyGoal = 6;