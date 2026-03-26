import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, AlertTriangle, ChevronDown, ChevronUp, Camera, CheckCircle2, FileText } from "lucide-react";
import { WORKERS, TOTAL, PRESENT, ABSENT, NOT_TAKEN } from "../data/workers";

const PENDING_WORKERS = WORKERS.filter(w => w.status === "Not Taken").slice(0, 4);

export default function SubmitScreen() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="flex flex-col items-center justify-center h-full px-6 gap-6"
        style={{ background: "#F8FAFC" }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(34,197,94,0.12)",
              boxShadow: "0 0 60px rgba(34,197,94,0.2)",
              border: "2px solid rgba(34,197,94,0.2)",
            }}
          >
            <CheckCircle2 size={56} style={{ color: "#22C55E" }} />
          </div>

          <div>
            <h2
              className="text-2xl"
              style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
            >
              Submitted! ✅
            </h2>
            <p
              className="text-sm mt-2"
              style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Attendance Submitted Successfully
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Saturday, 14 March 2026 · ANM-00123
            </p>
          </div>

          {/* Final summary */}
          <div
            className="w-full rounded-2xl p-4 grid grid-cols-3 gap-3"
            style={{ background: "white", boxShadow: "0 4px 16px rgba(26,46,7,0.08)" }}
          >
            {[
              { label: "Present", value: PRESENT,   color: "#16A34A" },
              { label: "Absent",  value: ABSENT,    color: "#DC2626" },
              { label: "Pending", value: NOT_TAKEN, color: "#D97706" },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <span
                  className="text-xl"
                  style={{ color: s.color, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
                >
                  {s.value}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/reports")}
            className="w-full py-4 rounded-xl text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
            style={{
              background: "linear-gradient(135deg, #7AB418, #5E8C12)",
              color: "white",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              boxShadow: "0 4px 20px rgba(122,180,24,0.3)",
            }}
          >
            <FileText size={16} />
            Generate Report
          </button>
          <button
            onClick={() => navigate("/home")}
            className="text-sm"
            style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#F8FAFC" }}>
      {/* Header */}
      <div
        className="flex-shrink-0 flex items-center gap-3 px-5 pt-12 pb-5"
        style={{ background: "linear-gradient(135deg, #1A2E07, #2A4710)" }}
      >
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.12)" }}
        >
          <ChevronLeft size={20} color="white" />
        </button>
        <div>
          <h2
            className="text-lg"
            style={{ color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
          >
            Submission Summary
          </h2>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Saturday, 14 March 2026
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-10">
        {/* Animator info */}
        <div
          className="rounded-2xl p-4 mb-4 flex items-center gap-3"
          style={{ background: "white", boxShadow: "0 2px 12px rgba(26,46,7,0.07)" }}
        >
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7AB418, #5E8C12)" }}
          >
            <span className="text-white text-base" style={{ fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>R</span>
          </div>
          <div>
            <p className="text-sm" style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
              Ravi Kumar
            </p>
            <p className="text-xs" style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              ANM-00123 · Puducherry Municipal Zone 4
            </p>
          </div>
        </div>

        {/* Summary card */}
        <div
          className="rounded-2xl p-5 mb-4"
          style={{ background: "white", boxShadow: "0 2px 12px rgba(26,46,7,0.07)" }}
        >
          <p className="text-sm mb-4" style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
            Attendance Summary
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Total Workers", value: TOTAL,              icon: "👥", color: "#2A4710", bg: "rgba(42,71,16,0.08)" },
              { label: "Punch Done",    value: TOTAL - NOT_TAKEN,  icon: "✅", color: "#16A34A", bg: "rgba(34,197,94,0.08)" },
              { label: "Punch Pending", value: NOT_TAKEN,          icon: "⚠️", color: "#D97706", bg: "rgba(245,158,11,0.08)" },
            ].map(s => (
              <div
                key={s.label}
                className="rounded-xl p-3 flex flex-col items-center gap-1"
                style={{ background: s.bg }}
              >
                <span style={{ fontSize: 18 }}>{s.icon}</span>
                <span
                  className="text-xl"
                  style={{ color: s.color, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, lineHeight: 1 }}
                >
                  {s.value}
                </span>
                <span
                  className="text-center"
                  style={{ color: s.color, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 9, opacity: 0.7 }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Warning banner */}
        {NOT_TAKEN > 0 && (
          <div
            className="rounded-2xl p-4 mb-4 flex items-start gap-3"
            style={{
              background: "rgba(245,158,11,0.08)",
              border: "1.5px solid rgba(245,158,11,0.25)",
            }}
          >
            <AlertTriangle size={18} style={{ color: "#D97706", flexShrink: 0, marginTop: 1 }} />
            <p className="text-xs" style={{ color: "#92400E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <strong>{NOT_TAKEN} workers' attendance</strong> not completed. You can go back & complete or submit anyway.
            </p>
          </div>
        )}

        {/* Pending workers list */}
        {NOT_TAKEN > 0 && (
          <div
            className="rounded-2xl mb-5 overflow-hidden"
            style={{ background: "white", boxShadow: "0 2px 12px rgba(26,46,7,0.07)" }}
          >
            <button
              className="w-full px-4 py-3.5 flex items-center justify-between"
              onClick={() => setExpanded(!expanded)}
            >
              <span className="text-sm" style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
                Pending Workers ({NOT_TAKEN})
              </span>
              {expanded ? <ChevronUp size={16} style={{ color: "#9CA3AF" }} /> : <ChevronDown size={16} style={{ color: "#9CA3AF" }} />}
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div style={{ borderTop: "1px solid #F3F4F6" }}>
                    {PENDING_WORKERS.map((w, i) => (
                      <div
                        key={w.id}
                        className="px-4 py-3 flex items-center gap-3"
                        style={{ borderBottom: i < PENDING_WORKERS.length - 1 ? "1px solid #F9FAFB" : "none" }}
                      >
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: "#F3F4F6" }}
                        >
                          <span style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 11 }}>
                            {w.initials}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs" style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                            {w.name}
                          </p>
                          <p className="text-xs" style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {w.id} · {w.zone}
                          </p>
                        </div>
                        <button
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs"
                          style={{
                            background: "rgba(122,180,24,0.1)",
                            color: "#7AB418",
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 600,
                          }}
                          onClick={() => navigate("/camera")}
                        >
                          <Camera size={11} />
                          Mark
                        </button>
                      </div>
                    ))}
                    {NOT_TAKEN > PENDING_WORKERS.length && (
                      <div className="px-4 py-2.5 text-center">
                        <span className="text-xs" style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          + {NOT_TAKEN - PENDING_WORKERS.length} more pending workers
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/workers")}
            className="w-full py-4 rounded-xl text-sm"
            style={{
              background: "white",
              border: "1.5px solid #E5E7EB",
              color: "#1A2E07",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              boxShadow: "0 2px 8px rgba(26,46,7,0.06)",
            }}
          >
            Go Back & Complete
          </button>
          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-xl text-sm active:scale-95 transition-transform"
            style={{
              background: "linear-gradient(135deg, #1A2E07, #2A4710)",
              color: "white",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              boxShadow: "0 4px 16px rgba(26,46,7,0.25)",
            }}
          >
            Submit Anyway
          </button>
        </div>
      </div>
    </div>
  );
}
