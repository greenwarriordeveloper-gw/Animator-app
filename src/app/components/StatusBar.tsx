import { Signal, Wifi, Battery } from "lucide-react";

interface StatusBarProps {
  dark?: boolean;
}

export function StatusBar({ dark = false }: StatusBarProps) {
  const color = dark ? "white" : "#1E3A5F";
  return (
    <div
      style={{
        paddingTop: "14px",
        paddingLeft: "24px",
        paddingRight: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "44px",
        flexShrink: 0,
      }}
    >
      <span style={{ fontWeight: 700, fontSize: "15px", color, letterSpacing: "-0.3px" }}>
        9:41
      </span>
      <div style={{ display: "flex", gap: "5px", alignItems: "center", color }}>
        <Signal size={14} strokeWidth={2.5} />
        <Wifi size={14} strokeWidth={2.5} />
        <Battery size={14} strokeWidth={2.5} />
      </div>
    </div>
  );
}
