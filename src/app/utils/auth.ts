export type UserRole = "admin" | "manager" | "animator";

export interface AuthUser {
  id: string;
  username: string;   // e.g. admin, manager1, animator_kowsalya
  password: string;   // In production, this would be hashed
  name: string;       // Display name e.g. KOWSALYA DEVI
  empId: string;      // e.g. GWPYIEC074
  role: UserRole;
  zone?: string;      // For animators/managers
  supervisor?: string; // For animators
  constituencies?: string[]; // Assigned constituencies (admin can assign)
}

const KEY = "worktrack_user";
const USERS_KEY = "worktrack_users";

// Mock users database
const DEFAULT_USERS: AuthUser[] = [
  {
    id: "USR-001",
    username: "admin",
    password: "admin123",
    name: "SYSTEM ADMIN",
    empId: "ADM-001",
    role: "admin",
  },
  {
    id: "USR-002",
    username: "manager1",
    password: "manager123",
    name: "RAJESH KUMAR",
    empId: "MGR-001",
    role: "manager",
    zone: "Zone 4",
  },
  {
    id: "USR-003",
    username: "animator_kowsalya",
    password: "anim123",
    name: "KOWSALYA DEVI",
    empId: "GWPYIEC074",
    role: "animator",
    zone: "Zone 3",
    supervisor: "RAJESH KUMAR",
  },
  {
    id: "USR-004",
    username: "animator_suresh",
    password: "anim123",
    name: "SURESH KUMAR",
    empId: "EMP-00456",
    role: "animator",
    zone: "Zone 4",
    supervisor: "RAJESH KUMAR",
  },
];

// Initialize users database
export function initUsers() {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
  }
}

// Get all users (admin only)
export function getAllUsers(): AuthUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_USERS;
  } catch {
    return DEFAULT_USERS;
  }
}

// Save all users
export function saveAllUsers(users: AuthUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Login function
export function login(username: string, password: string): AuthUser | null {
  const users = getAllUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    saveUser(user);
    return user;
  }
  return null;
}

export function saveUser(user: AuthUser) {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function getUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function clearUser() {
  localStorage.removeItem(KEY);
}

// Role-based permission checks
export function isAdmin(user: AuthUser | null): boolean {
  return user?.role === "admin";
}

export function isManager(user: AuthUser | null): boolean {
  return user?.role === "manager";
}

export function isAnimator(user: AuthUser | null): boolean {
  return user?.role === "animator";
}

export function canManageUsers(user: AuthUser | null): boolean {
  return isAdmin(user);
}

export function canViewAllData(user: AuthUser | null): boolean {
  return isAdmin(user) || isManager(user);
}

export function canMarkAttendance(user: AuthUser | null): boolean {
  return user !== null; // All logged-in users can mark attendance
}

/** First letter(s) of the supervisor name for avatar */
export function getInitials(name: string): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : parts[0][0].toUpperCase();
}

/** Ward display label — strip "GWA_" prefix */
export function wardLabel(username: string): string {
  return username.replace(/^GWA_/, "").replace(/_/g, " ");
}