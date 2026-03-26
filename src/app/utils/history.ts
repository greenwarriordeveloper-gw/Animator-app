export interface ActionHistory {
  id: string;
  timestamp: string;
  date: string;
  time: string;
  action: "edit" | "delete" | "create";
  performedBy: string; // User name
  performedByRole: string; // User role
  performedById: string; // User ID
  targetType: "worker" | "user";
  targetId: string;
  targetName: string;
  changes?: {
    field: string;
    oldValue: string;
    newValue: string;
  }[];
  details?: string;
}

const HISTORY_KEY = "worktrack_action_history";

// Initialize history
export function initHistory() {
  if (!localStorage.getItem(HISTORY_KEY)) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify([]));
  }
}

// Get all history
export function getHistory(): ActionHistory[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Add history entry
export function addHistory(entry: Omit<ActionHistory, "id" | "timestamp" | "date" | "time">): void {
  const history = getHistory();
  const now = new Date();
  
  const newEntry: ActionHistory = {
    ...entry,
    id: `HIST-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: now.toISOString(),
    date: formatDate(now),
    time: formatTime(now),
  };
  
  history.unshift(newEntry); // Add to beginning
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

// Get history by action type
export function getHistoryByAction(action: "edit" | "delete" | "create"): ActionHistory[] {
  return getHistory().filter(h => h.action === action);
}

// Get history by target
export function getHistoryByTarget(targetType: string, targetId: string): ActionHistory[] {
  return getHistory().filter(h => h.targetType === targetType && h.targetId === targetId);
}

// Get history by user
export function getHistoryByUser(userId: string): ActionHistory[] {
  return getHistory().filter(h => h.performedById === userId);
}

// Clear all history (admin only)
export function clearHistory(): void {
  localStorage.setItem(HISTORY_KEY, JSON.stringify([]));
}

// Format date as dd/mm/yyyy
function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Format time as HH:MM AM/PM
function formatTime(date: Date): string {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}
