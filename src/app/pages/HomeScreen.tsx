import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Calendar, Camera, Bell, ChevronRight, Clock, MapPin, User, Users } from "lucide-react";
import { WORKERS, TOTAL, PRESENT, ABSENT, NOT_TAKEN } from "../data/workers";
import { getUser, getInitials, wardLabel, isAnimator, canViewAllData } from "../utils/auth";

const ROLE_CONFIG = {
  admin: { label: "Admin", color: "#DC2626", bg: "rgba(239,68,68,0.1)", icon: "🛡️" },
  manager: { label: "Manager", color: "#7AB418", bg: "rgba(122,180,24,0.1)", icon: "👔" },
  animator: { label: "Animator", color: "#2563EB", bg: "rgba(37,99,235,0.1)", icon: "👤" },
};

// Filter workers based on user role
function getFilteredWorkers(userId: string | undefined, userRole: string | undefined) {
  if (!userRole || canViewAllData({ role: userRole } as any)) {
    return WORKERS; // Admin and Manager see all
  }
  // Animator sees only their own workers
  return WORKERS.filter(w => w.animatorId === userId || w.animatorId === "ANIM-001");
}

const recentWorkers = WORKERS.slice(0, 5);

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Present:    { bg: "rgba(34,197,94,0.1)",   color: "#16A34A" },
    Absent:     { bg: "rgba(239,68,68,0.1)",    color: "#DC2626" },
    "Half Day": { bg: "rgba(122,180,24,0.1)",   color: "#5E8C12" },
    "Not Taken":{ bg: "rgba(245,158,11,0.1)",   color: "#D97706" },
  };
  const s = map[status] || map["Present"];
  return (
    <span
      className="text-xs px-2.5 py-1 rounded-full"
      style={{ background: s.bg, color: s.color, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
    >
      {status}
    </span>
  );
}

function WorkerAvatar({ initials, color, size = 40 }: { initials: string; color: string; size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size, background: `${color}22`, border: `1.5px solid ${color}44` }}
    >
      <span style={{ color, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: size * 0.3 }}>
        {initials}
      </span>
    </div>
  );
}

export default function HomeScreen() {
  const navigate = useNavigate();
  const user = getUser();
  const supervisorName = user?.supervisor || user?.name || "User";
  const firstName = supervisorName.split(/\s+/)[0];
  const empId = user?.empId || user?.username || "—";
  const ward = user ? wardLabel(user.username) : "Puducherry";
  const avatarInitial = getInitials(supervisorName);
  const progress = Math.round((PRESENT / TOTAL) * 100);

  // Get role-specific greeting
  const roleConfig = user?.role ? ROLE_CONFIG[user.role] : null;
  const greeting = roleConfig ? `Hello, ${roleConfig.label} 👋` : `Hello, ${firstName} 👋`;

  const statBoxes = [
    { label: "Total Workers", value: TOTAL,     icon: "👥", color: "#2A4710", bg: "rgba(42,71,16,0.08)" },
    { label: "Present",       value: PRESENT,   icon: "✅", color: "#16A34A", bg: "rgba(34,197,94,0.08)" },
    { label: "Absent",        value: ABSENT,    icon: "❌", color: "#DC2626", bg: "rgba(239,68,68,0.08)" },
    { label: "Not Taken",     value: NOT_TAKEN, icon: "🕐", color: "#D97706", bg: "rgba(245,158,11,0.08)" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#F8FAFC" }}>
      {/* Header */}
      <div
        className="flex-shrink-0 px-5 pt-12 pb-4"
        style={{ background: "linear-gradient(135deg, #1A2E07, #2A4710)" }}
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-base" style={{ color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
              {greeting}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className="px-2 py-0.5 rounded-full text-xs"
                style={{ background: "rgba(122,180,24,0.2)", color: "#8FCC20", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
              >
                {empId}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="w-9 h-9 rounded-xl flex items-center justify-center relative"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              <Bell size={18} color="white" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "#7AB418" }} />
            </button>
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7AB418, #5E8C12)" }}
              onClick={() => navigate("/profile")}
            >
              <span className="text-sm text-white" style={{ fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{avatarInitial}</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Saturday, 14 March 2026
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <MapPin size={11} style={{ color: "#8FCC20" }} />
              <p className="text-xs" style={{ color: "#8FCC20", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                {ward}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Today's Attendance Card */}
        <div className="px-5 mt-4">
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="rounded-2xl p-5"
            style={{ background: "white", boxShadow: "0 4px 20px rgba(26,46,7,0.1)" }}
          >
            {/* Card header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(26,46,7,0.06)" }}>
                  <Calendar size={16} style={{ color: "#1A2E07" }} />
                </div>
                <p className="text-sm" style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
                  Today's Attendance
                </p>
              </div>
              <span
                className="text-xs px-2.5 py-1 rounded-full"
                style={{ background: "rgba(122,180,24,0.1)", color: "#7AB418", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
              >
                14 Mar
              </span>
            </div>

            {/* 2x2 stat grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {statBoxes.map(box => (
                <div
                  key={box.label}
                  className="rounded-xl p-3 flex flex-col items-center gap-1"
                  style={{ background: box.bg }}
                >
                  <span style={{ fontSize: 20 }}>{box.icon}</span>
                  <span
                    className="text-2xl"
                    style={{ color: box.color, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, lineHeight: 1 }}
                  >
                    {String(box.value).padStart(2, "0")}
                  </span>
                  <span
                    className="text-xs text-center"
                    style={{ color: box.color, fontFamily: "'Plus Jakarta Sans', sans-serif", opacity: 0.7 }}
                  >
                    {box.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Camera / Mark Attendance Button */}
            <button
              onClick={() => navigate("/camera")}
              className="w-full py-3.5 rounded-xl flex items-center justify-center gap-3 active:scale-95 transition-transform mb-4"
              style={{
                background: "linear-gradient(135deg, #7AB418, #5E8C12)",
                boxShadow: "0 4px 20px rgba(122,180,24,0.35)",
              }}
            >
              <Camera size={20} color="white" />
              <div className="text-left">
                <p className="text-sm text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
                  Mark Attendance
                </p>
                <p className="text-xs text-white" style={{ opacity: 0.75, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Tap to capture & mark worker
                </p>
              </div>
            </button>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-xs" style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {PRESENT} of {TOTAL} attendance completed
                </span>
                <span className="text-xs" style={{ color: "#16A34A", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                  {progress}%
                </span>
              </div>
              <div className="rounded-full overflow-hidden" style={{ height: 6, background: "#F3F4F6" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #22C55E, #16A34A)" }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <div className="px-5 mt-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm" style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
              Recent Activity
            </h3>
            <button
              onClick={() => navigate("/workers")}
              className="flex items-center gap-0.5 text-xs"
              style={{ color: "#7AB418", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
            >
              View All <ChevronRight size={14} />
            </button>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ background: "white", boxShadow: "0 2px 12px rgba(26,46,7,0.07)" }}>
            {recentWorkers.map((w, i) => (
              <div
                key={w.id}
                className="px-4 py-3 flex items-center gap-3"
                style={{ borderBottom: i < recentWorkers.length - 1 ? "1px solid #F3F4F6" : "none" }}
              >
                <WorkerAvatar initials={w.initials} color={w.color} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs" style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                    {w.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs" style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {w.id}
                    </span>
                    {w.checkIn !== "—" && (
                      <>
                        <span style={{ color: "#E5E7EB" }}>·</span>
                        <span className="text-xs flex items-center gap-1" style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          <Clock size={10} />
                          {w.checkIn}
                        </span>
                      </>
                    )}
                  </div>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded mt-1 inline-block"
                    style={{ background: "#F3F4F6", color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 9 }}
                  >
                    {w.zone}, Puducherry
                  </span>
                </div>
                <StatusBadge status={w.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Quick History Access */}
        <div className="px-5 mt-5">
          <h3 className="text-sm mb-3" style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
            Quick History Access
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {/* Individual History Card */}
            <motion.button
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              onClick={() => navigate("/history?mode=individual")}
              className="rounded-xl p-4 flex flex-col items-start gap-2 active:scale-95 transition-transform"
              style={{ background: "white", boxShadow: "0 2px 12px rgba(26,46,7,0.07)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(122,180,24,0.1)" }}>
                <User size={20} style={{ color: "#7AB418" }} />
              </div>
              <div className="text-left">
                <p className="text-xs mb-0.5" style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
                  Individual History
                </p>
                <p className="text-xs leading-tight" style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  View single worker's log
                </p>
              </div>
              <div className="flex items-center gap-1 mt-auto">
                <span className="text-xs" style={{ color: "#7AB418", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                  Open
                </span>
                <ChevronRight size={12} style={{ color: "#7AB418" }} />
              </div>
            </motion.button>

            {/* Bulk History Card */}
            <motion.button
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              onClick={() => navigate("/history?mode=bulk")}
              className="rounded-xl p-4 flex flex-col items-start gap-2 active:scale-95 transition-transform"
              style={{ background: "white", boxShadow: "0 2px 12px rgba(26,46,7,0.07)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(122,180,24,0.1)" }}>
                <Users size={20} style={{ color: "#7AB418" }} />
              </div>
              <div className="text-left">
                <p className="text-xs mb-0.5" style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
                  Bulk History
                </p>
                <p className="text-xs leading-tight" style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  View all workers by range
                </p>
              </div>
              <div className="flex items-center gap-1 mt-auto">
                <span className="text-xs" style={{ color: "#7AB418", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                  Open
                </span>
                <ChevronRight size={12} style={{ color: "#7AB418" }} />
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}