import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

export default function SplashScreen() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 2;
      });
    }, 40);
    const timer = setTimeout(() => navigate("/home"), 2400);
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-between h-full px-8 py-16"
      style={{ background: "linear-gradient(160deg, #1A2E07 0%, #2A4710 60%, #0D1F03 100%)" }}
    >
      <div />

      {/* Logo + name */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-4"
      >
        {/* Icon */}
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{
            background: "rgba(122,180,24,0.15)",
            border: "2px solid rgba(122,180,24,0.5)",
            boxShadow: "0 0 40px rgba(122,180,24,0.2)",
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            {/* Clipboard */}
            <rect x="8" y="12" width="32" height="30" rx="4" stroke="#7AB418" strokeWidth="2" />
            <rect x="18" y="8" width="12" height="8" rx="2" stroke="#7AB418" strokeWidth="2" fill="rgba(122,180,24,0.1)" />
            {/* Check rows */}
            <path d="M16 24l3 3 6-6" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="28" y1="24" x2="34" y2="24" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M16 33l3 3 6-6" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="28" y1="33" x2="34" y2="33" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        <div className="text-center">
          <h1
            className="text-4xl text-white"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, letterSpacing: "-0.5px" }}
          >
            GW Attendance App
          </h1>
          <p
            className="text-sm mt-2"
            style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Attendance Made Simple
          </p>
        </div>

        {/* Decorative dots */}
        <div className="flex gap-2 mt-2">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: i === 1 ? 24 : 6,
                height: 6,
                background: i === 1 ? "#7AB418" : "rgba(255,255,255,0.2)",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Loading bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full"
      >
        <div className="flex justify-between mb-2">
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Initializing...
          </span>
          <span className="text-xs" style={{ color: "#7AB418", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
            {progress}%
          </span>
        </div>
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: 4, background: "rgba(255,255,255,0.1)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #7AB418, #8FCC20)",
            }}
          />
        </div>
        <p
          className="text-center text-xs mt-4"
          style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          v1.0.0 · Puducherry Municipal
        </p>
      </motion.div>
    </div>
  );
}