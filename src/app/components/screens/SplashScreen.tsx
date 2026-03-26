import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ScanFace } from "lucide-react";

export function SplashScreen() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        background: "linear-gradient(180deg, #0F2540 0%, #1E3A5F 100%)",
        position: "relative",
        overflow: "hidden",
        paddingBottom: "40px",
      }}
    >
      {/* Background decorative circles */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          background: "rgba(0,200,150,0.06)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "120px",
          left: "-60px",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: "rgba(0,200,150,0.05)",
          pointerEvents: "none",
        }}
      />

      {/* Status bar area */}
      <div style={{ height: "54px" }} />

      {/* Center content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          flex: 1,
          justifyContent: "center",
          paddingBottom: "40px",
        }}
      >
        {/* Animated Face Scan Icon */}
        <div style={{ position: "relative", width: "140px", height: "140px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Outer pulsing ring 1 */}
          <div
            className="animate-ping"
            style={{
              position: "absolute",
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              border: "1.5px solid rgba(0,200,150,0.3)",
              animationDuration: "2s",
            }}
          />
          {/* Outer pulsing ring 2 */}
          <div
            className="animate-ping"
            style={{
              position: "absolute",
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              border: "1.5px solid rgba(0,200,150,0.4)",
              animationDuration: "2s",
              animationDelay: "0.5s",
            }}
          />
          {/* Inner pulsing ring 3 */}
          <div
            className="animate-ping"
            style={{
              position: "absolute",
              width: "82px",
              height: "82px",
              borderRadius: "50%",
              border: "1.5px solid rgba(0,200,150,0.5)",
              animationDuration: "2s",
              animationDelay: "1s",
            }}
          />
          {/* Icon container */}
          <div
            style={{
              width: "76px",
              height: "76px",
              borderRadius: "50%",
              background: "rgba(0,200,150,0.15)",
              border: "2px solid rgba(0,200,150,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
            }}
          >
            <ScanFace size={36} color="#00C896" strokeWidth={1.5} />
          </div>
        </div>

        {/* App name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ textAlign: "center" }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "40px",
              fontWeight: 800,
              letterSpacing: "-1px",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Attend<span style={{ color: "#00C896" }}>AI</span>
          </h1>
          <p
            style={{
              color: "rgba(148,190,233,0.85)",
              fontSize: "14px",
              fontWeight: 400,
              marginTop: "10px",
              letterSpacing: "0.2px",
            }}
          >
            Smart Attendance, Powered by AI
          </p>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{ display: "flex", gap: "8px", marginTop: "8px" }}
        >
          {["Face ID", "GPS Track", "AI Insights"].map((f) => (
            <div
              key={f}
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "20px",
                padding: "5px 12px",
                color: "rgba(200,220,240,0.8)",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              {f}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Get Started button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{ width: "100%", padding: "0 24px" }}
      >
        <button
          onClick={() => navigate("/login")}
          style={{
            width: "100%",
            padding: "16px",
            background: "linear-gradient(135deg, #00C896 0%, #00a87a 100%)",
            border: "none",
            borderRadius: "14px",
            color: "white",
            fontSize: "16px",
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            boxShadow: "0 8px 24px rgba(0,200,150,0.4)",
            letterSpacing: "0.3px",
          }}
        >
          Get Started →
        </button>
        <p
          style={{
            textAlign: "center",
            color: "rgba(148,190,233,0.5)",
            fontSize: "12px",
            marginTop: "14px",
          }}
        >
          Trusted by 50,000+ employees worldwide
        </p>
      </motion.div>
    </div>
  );
}
