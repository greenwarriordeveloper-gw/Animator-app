export type WorkerStatus = "Present" | "Absent" | "Not Taken" | "Half Day";

export interface Worker {
  id: string;
  name: string;
  zone: string;
  ward: string;
  contact: string;
  status: WorkerStatus;
  checkIn: string;
  initials: string;
  color: string;
  photo: string;
  animatorId: string; // Links worker to specific animator
}

const COLORS = ["#F97316", "#0F2540", "#22C55E", "#6366F1", "#EC4899", "#14B8A6", "#8B5CF6", "#EF4444"];

function avatarColor(name: string) {
  return COLORS[name.charCodeAt(0) % COLORS.length];
}

function initials(name: string) {
  return name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
}

// Cycling photo pool — male & female Unsplash portraits
const MALE_PHOTOS = [
  "https://images.unsplash.com/photo-1606384682764-c3065dbcaf85?w=80&q=80",
  "https://images.unsplash.com/photo-1760428690009-91927cd3c538?w=80&q=80",
];
const FEMALE_PHOTOS = [
  "https://images.unsplash.com/photo-1631513497648-a79a6d32ed9e?w=80&q=80",
  "https://images.unsplash.com/photo-1766995310575-5740ceb4eb95?w=80&q=80",
];

function isFemale(name: string) {
  const f = ["Devi", "Anitha", "Kavitha", "Priya", "Lakshmi", "Deepa", "Nirmala", "Selvi", "Uma", "Indira"];
  return f.some(n => name.includes(n));
}

let maleIdx = 0;
let femaleIdx = 0;
function photo(name: string): string {
  if (isFemale(name)) return FEMALE_PHOTOS[femaleIdx++ % FEMALE_PHOTOS.length];
  return MALE_PHOTOS[maleIdx++ % MALE_PHOTOS.length];
}

const rawWorkers = [
  { id: "EMP-00456", name: "Suresh Kumar",    zone: "Zone 4", ward: "Ward 1", contact: "98401 23456", status: "Present"   as WorkerStatus, checkIn: "08:45 AM", animatorId: "USR-004" },
  { id: "EMP-00457", name: "Murugan P",        zone: "Zone 4", ward: "Ward 1", contact: "94431 78901", status: "Present"   as WorkerStatus, checkIn: "08:52 AM", animatorId: "USR-004" },
  { id: "EMP-00458", name: "Anitha Devi",      zone: "Zone 3", ward: "Ward 2", contact: "87541 34567", status: "Present"   as WorkerStatus, checkIn: "09:10 AM", animatorId: "USR-003" },
  { id: "EMP-00459", name: "Rajesh M",         zone: "Zone 4", ward: "Ward 1", contact: "99403 12345", status: "Absent"    as WorkerStatus, checkIn: "—", animatorId: "USR-004" },
  { id: "EMP-00460", name: "Kavitha S",        zone: "Zone 2", ward: "Ward 3", contact: "73582 56789", status: "Not Taken" as WorkerStatus, checkIn: "—", animatorId: "USR-003" },
  { id: "EMP-00461", name: "Dinesh R",         zone: "Zone 4", ward: "Ward 1", contact: "96001 43210", status: "Present"   as WorkerStatus, checkIn: "08:30 AM", animatorId: "USR-004" },
  { id: "EMP-00462", name: "Priya M",          zone: "Zone 3", ward: "Ward 2", contact: "88792 67890", status: "Half Day"  as WorkerStatus, checkIn: "09:05 AM", animatorId: "USR-003" },
  { id: "EMP-00463", name: "Senthil K",        zone: "Zone 4", ward: "Ward 1", contact: "97651 98765", status: "Not Taken" as WorkerStatus, checkIn: "—", animatorId: "USR-004" },
  { id: "EMP-00464", name: "Lakshmi V",        zone: "Zone 2", ward: "Ward 3", contact: "90034 54321", status: "Present"   as WorkerStatus, checkIn: "08:40 AM", animatorId: "USR-003" },
  { id: "EMP-00465", name: "Manoj B",          zone: "Zone 4", ward: "Ward 1", contact: "94872 11223", status: "Absent"    as WorkerStatus, checkIn: "—", animatorId: "USR-004" },
  { id: "EMP-00466", name: "Deepa R",          zone: "Zone 3", ward: "Ward 2", contact: "81234 33445", status: "Present"   as WorkerStatus, checkIn: "09:00 AM", animatorId: "USR-003" },
  { id: "EMP-00467", name: "Vijay S",          zone: "Zone 4", ward: "Ward 1", contact: "76543 55667", status: "Not Taken" as WorkerStatus, checkIn: "—", animatorId: "USR-004" },
  { id: "EMP-00468", name: "Tamilarasan N",    zone: "Zone 2", ward: "Ward 3", contact: "98765 77889", status: "Present"   as WorkerStatus, checkIn: "08:50 AM", animatorId: "USR-003" },
  { id: "EMP-00469", name: "Nirmala T",        zone: "Zone 3", ward: "Ward 2", contact: "83456 99001", status: "Present"   as WorkerStatus, checkIn: "09:15 AM", animatorId: "USR-003" },
  { id: "EMP-00470", name: "Karthik P",        zone: "Zone 4", ward: "Ward 1", contact: "91122 44556", status: "Half Day"  as WorkerStatus, checkIn: "09:20 AM", animatorId: "USR-004" },
  { id: "EMP-00471", name: "Selvi A",          zone: "Zone 2", ward: "Ward 3", contact: "79988 66778", status: "Absent"    as WorkerStatus, checkIn: "—", animatorId: "USR-003" },
  { id: "EMP-00472", name: "Ramesh G",         zone: "Zone 4", ward: "Ward 1", contact: "93344 88990", status: "Present"   as WorkerStatus, checkIn: "08:35 AM", animatorId: "USR-004" },
  { id: "EMP-00473", name: "Uma D",            zone: "Zone 3", ward: "Ward 2", contact: "85566 11223", status: "Not Taken" as WorkerStatus, checkIn: "—", animatorId: "USR-003" },
  { id: "EMP-00474", name: "Balamurugan J",    zone: "Zone 4", ward: "Ward 1", contact: "97788 33445", status: "Present"   as WorkerStatus, checkIn: "08:48 AM", animatorId: "USR-004" },
  { id: "EMP-00475", name: "Indira P",         zone: "Zone 2", ward: "Ward 3", contact: "84400 55667", status: "Present"   as WorkerStatus, checkIn: "09:02 AM", animatorId: "USR-003" },
];

export const WORKERS: Worker[] = rawWorkers.map(w => ({
  ...w,
  initials: initials(w.name),
  color: avatarColor(w.name),
  photo: photo(w.name),
}));

export const TOTAL = 48;
export const PRESENT = 32;
export const ABSENT = 8;
export const NOT_TAKEN = 8;

// Helper function to filter workers by animator
export function getWorkersByAnimator(animatorId: string): Worker[] {
  return WORKERS.filter(w => w.animatorId === animatorId);
}

// Helper function to get stats for specific animator
export function getStatsForAnimator(animatorId: string) {
  const workers = getWorkersByAnimator(animatorId);
  return {
    total: workers.length,
    present: workers.filter(w => w.status === "Present").length,
    absent: workers.filter(w => w.status === "Absent").length,
    notTaken: workers.filter(w => w.status === "Not Taken").length,
    halfDay: workers.filter(w => w.status === "Half Day").length,
  };
}