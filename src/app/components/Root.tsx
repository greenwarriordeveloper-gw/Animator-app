import { Outlet } from "react-router";
import { AppProvider } from "../context/AppContext";

export function Root() {
  return (
    <AppProvider>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #080f1e 0%, #111e35 40%, #0a1525 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 16px",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {/* Ambient glow circles */}
        <div
          style={{
            position: "fixed",
            top: "15%",
            left: "10%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,200,150,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "fixed",
            bottom: "20%",
            right: "8%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(30,58,95,0.4) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Phone Frame */}
        <div
          style={{
            width: "393px",
            height: "852px",
            flexShrink: 0,
            borderRadius: "52px",
            background: "#0d0d0d",
            padding: "12px",
            boxShadow:
              "0 60px 120px rgba(0,0,0,0.7), 0 20px 40px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.15)",
            position: "relative",
          }}
        >
          {/* Side buttons (decorative) */}
          <div
            style={{
              position: "absolute",
              left: "-4px",
              top: "130px",
              width: "4px",
              height: "36px",
              background: "#1a1a1a",
              borderRadius: "2px 0 0 2px",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "-4px",
              top: "180px",
              width: "4px",
              height: "64px",
              background: "#1a1a1a",
              borderRadius: "2px 0 0 2px",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "-4px",
              top: "258px",
              width: "4px",
              height: "64px",
              background: "#1a1a1a",
              borderRadius: "2px 0 0 2px",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "-4px",
              top: "200px",
              width: "4px",
              height: "90px",
              background: "#1a1a1a",
              borderRadius: "0 2px 2px 0",
            }}
          />

          {/* Screen */}
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "40px",
              overflow: "hidden",
              position: "relative",
              background: "#f8fafc",
            }}
          >
            {/* Dynamic Island */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "120px",
                height: "34px",
                background: "#0d0d0d",
                borderRadius: "20px",
                zIndex: 100,
              }}
            />

            {/* Screen Content */}
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </AppProvider>
  );
}