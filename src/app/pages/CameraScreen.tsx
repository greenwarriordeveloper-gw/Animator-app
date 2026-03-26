import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Search, Check } from "lucide-react";

type ScanPhase = "idle" | "scanning" | "detected";

const WORKER = {
  name: "Suresh Kumar",
  id: "EMP-00456",
  zone: "Zone 4, Puducherry",
  initials: "SK",
  color: "#7AB418",
};

export default function CameraScreen() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<ScanPhase>("idle");
  const [saved, setSaved] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setPhase("scanning"), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase === "scanning") {
      const interval = setInterval(() => {
        setScanProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setPhase("detected");
            return 100;
          }
          return p + 5;
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const handleConfirm = () => {
    setSaved(true);
    setTimeout(() => navigate("/home"), 1800);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#050D02" }}>
      {/* Top bar */}
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <ChevronLeft size={20} color="white" />
        </button>
        <h2
          className="text-base"
          style={{ color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
        >
          Mark Attendance
        </h2>
        <div className="flex-1" />
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{ background: "rgba(122,180,24,0.15)", border: "1px solid rgba(122,180,24,0.3)" }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#7AB418", animation: "blink 1.5s ease infinite" }}
          />
          <span className="text-xs" style={{ color: "#7AB418", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
            LIVE
          </span>
        </div>
      </div>

      {/* Camera viewfinder */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Simulated camera bg */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, #060C02 0%, #0A1405 50%, #060C02 100%)" }}
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="absolute w-full" style={{ height: 1, background: "white", top: `${(i + 1) * 16.6}%` }} />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="absolute h-full" style={{ width: 1, background: "white", left: `${(i + 1) * 16.6}%` }} />
          ))}
        </div>

        {/* Face frame */}
        <div className="relative flex items-center justify-center" style={{ width: 220, height: 260 }}>
          {/* Corner brackets */}
          {[
            { top: 0, left: 0, borderRight: "none", borderBottom: "none", borderRadius: "6px 0 0 0" },
            { top: 0, right: 0, borderLeft: "none", borderBottom: "none", borderRadius: "0 6px 0 0" },
            { bottom: 0, right: 0, borderLeft: "none", borderTop: "none", borderRadius: "0 0 6px 0" },
            { bottom: 0, left: 0, borderRight: "none", borderTop: "none", borderRadius: "0 0 0 6px" },
          ].map((style, i) => (
            <div
              key={i}
              className="absolute w-10 h-12"
              style={{
                ...style,
                border: `3px solid ${phase === "detected" ? "#22C55E" : "#7AB418"}`,
                transition: "border-color 0.5s",
              }}
            />
          ))}

          {/* Content */}
          <AnimatePresence mode="wait">
            {phase === "idle" && (
              <motion.div
                key="idle"
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px dashed rgba(122,180,24,0.4)" }}
                >
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <circle cx="18" cy="13" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                    <path d="M6 30c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </motion.div>
            )}
            {phase === "scanning" && (
              <motion.div
                key="scanning"
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="relative">
                  <svg width="100" height="120" viewBox="0 0 100 120" fill="none">
                    <ellipse cx="50" cy="55" rx="30" ry="36" stroke="rgba(122,180,24,0.5)" strokeWidth="1" />
                    <circle cx="39" cy="50" r="3.5" fill="rgba(122,180,24,0.6)" />
                    <circle cx="61" cy="50" r="3.5" fill="rgba(122,180,24,0.6)" />
                    <path d="M41 63c3 3 15 3 18 0" stroke="rgba(122,180,24,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {/* Scan line */}
                  <div
                    className="absolute left-0 right-0 h-0.5"
                    style={{
                      background: "linear-gradient(90deg, transparent, #7AB418, transparent)",
                      animation: "scanY 1.5s ease-in-out infinite",
                      top: "30%",
                    }}
                  />
                </div>
                <div
                  className="w-20 rounded-full overflow-hidden"
                  style={{ height: 3, background: "rgba(255,255,255,0.1)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${scanProgress}%`, background: "#7AB418", transition: "width 0.08s" }}
                  />
                </div>
              </motion.div>
            )}
            {phase === "detected" && (
              <motion.div
                key="detected"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center"
              >
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(34,197,94,0.15)",
                    boxShadow: "0 0 40px rgba(34,197,94,0.25)",
                    border: "2px solid rgba(34,197,94,0.4)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 800,
                      fontSize: 28,
                      color: "#22C55E",
                    }}
                  >
                    SK
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Status text below frame */}
        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1">
          <p
            className="text-sm"
            style={{
              color: phase === "detected" ? "#22C55E" : "rgba(255,255,255,0.6)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              transition: "color 0.4s",
            }}
          >
            {phase === "idle" ? "Position worker's face in the frame" : phase === "scanning" ? "Scanning..." : "Worker Identified ✓"}
          </p>
        </div>
      </div>

      {/* Worker info + actions panel */}
      <AnimatePresence>
        {phase === "detected" && (
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="flex-shrink-0 rounded-t-3xl px-5 pt-5 pb-8"
            style={{ background: "#F8FAFC" }}
          >
            {saved ? (
              <div className="flex flex-col items-center py-4 gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(34,197,94,0.12)" }}
                >
                  <Check size={28} style={{ color: "#22C55E" }} />
                </motion.div>
                <p className="text-base" style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
                  Attendance Saved!
                </p>
              </div>
            ) : (
              <>
                {/* Worker card */}
                <div
                  className="rounded-2xl p-4 mb-4 flex items-center gap-3"
                  style={{ background: "white", boxShadow: "0 2px 12px rgba(26,46,7,0.08)" }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `${WORKER.color}22`, border: `2px solid ${WORKER.color}44` }}
                  >
                    <span
                      style={{ color: WORKER.color, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16 }}
                    >
                      {WORKER.initials}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm" style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
                      {WORKER.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {WORKER.id} · {WORKER.zone}
                    </p>
                  </div>
                </div>

                {/* Confirm button */}
                <button
                  onClick={handleConfirm}
                  className="w-full py-4 rounded-xl text-sm active:scale-95 transition-transform mb-3"
                  style={{
                    background: "linear-gradient(135deg, #7AB418, #5E8C12)",
                    color: "white",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    boxShadow: "0 4px 16px rgba(122,180,24,0.35)",
                  }}
                >
                  Confirm & Save
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Idle bottom hint */}
      {phase !== "detected" && (
        <div className="flex-shrink-0 px-5 pb-8 pt-4 flex flex-col items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm"
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Cancel
          </button>
          <button
            className="text-xs flex items-center gap-1"
            style={{ color: "#7AB418", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
          >
            <Search size={12} />
            Search Worker by ID instead
          </button>
        </div>
      )}

      <style>{`
        @keyframes scanY {
          0% { top: 15%; }
          50% { top: 70%; }
          100% { top: 15%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}