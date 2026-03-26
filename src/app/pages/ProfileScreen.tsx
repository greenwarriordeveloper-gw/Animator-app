import { useState } from "react";
import { useNavigate } from "react-router";
import { Bell, MapPin, Moon, HelpCircle, LogOut, ChevronRight, Camera, FileText, Shield, Users } from "lucide-react";
import { getUser, getInitials, wardLabel, clearUser, canManageUsers } from "../utils/auth";

const settings = [
  { icon: Bell,       label: "Notification Preferences", color: "#6366F1", toggle: false },
  { icon: Moon,       label: "Dark Mode",                color: "#2A4710", toggle: true,  key: "dark" },
  { icon: FileText,   label: "Report Settings",          color: "#7AB418", toggle: false },
  { icon: HelpCircle, label: "Help & Support",           color: "#3B82F6", toggle: false },
];

const ROLE_CONFIG = {
  admin: { label: "Admin", color: "#DC2626", bg: "rgba(239,68,68,0.1)", icon: "🛡️" },
  manager: { label: "Manager", color: "#7AB418", bg: "rgba(122,180,24,0.1)", icon: "👔" },
  animator: { label: "Animator", color: "#2563EB", bg: "rgba(37,99,235,0.1)", icon: "👤" },
};

export default function ProfileScreen() {
  const navigate = useNavigate();
  const [toggles, setToggles] = useState<Record<string, boolean>>({ dark: false });

  const user = getUser();
  const displayName = user?.name || "User";
  const empId = user?.empId || "—";
  const ward = user?.zone || "—";
  const roleConfig = user ? ROLE_CONFIG[user.role] : null;
  const avatarInitials = getInitials(displayName);

  const flip = (key: string) => setToggles(p => ({ ...p, [key]: !p[key] }));

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      clearUser();
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#F8FAFC" }}>
      {/* Header gradient */}
      <div
        className="flex-shrink-0 px-5 pt-12 pb-8"
        style={{ background: "linear-gradient(160deg, #1A2E07, #2A4710)" }}
      >
        <div className="flex flex-col items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #7AB418, #5E8C12)",
                boxShadow: "0 8px 24px rgba(122,180,24,0.35)",
              }}
            >
              <span
                className="text-3xl text-white"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
              >
                {avatarInitials}
              </span>
            </div>
            <button
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
            >
              <Camera size={13} style={{ color: "#1A2E07" }} />
            </button>
          </div>

          <div className="text-center">
            <h2
              className="text-lg"
              style={{ color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
            >
              {displayName || "—"}
            </h2>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span
                className="px-3 py-1 rounded-full text-xs"
                style={{
                  background: "rgba(122,180,24,0.2)",
                  color: "#8FCC20",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  border: "1px solid rgba(122,180,24,0.3)",
                }}
              >
                {empId}
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs"
                style={{
                  background: roleConfig?.bg || "rgba(255,255,255,0.1)",
                  color: roleConfig?.color || "rgba(255,255,255,0.6)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                {roleConfig?.label || "Animator"}
              </span>
            </div>
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <MapPin size={11} style={{ color: "#8FCC20" }} />
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {ward}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Admin Section */}
        {canManageUsers(user) && (
          <div className="px-5 mt-5">
            <p
              className="text-xs mb-3"
              style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}
            >
              Admin Tools
            </p>
            <button
              onClick={() => navigate("/users")}
              className="w-full rounded-2xl px-4 py-4 flex items-center gap-3"
              style={{ background: "white", boxShadow: "0 2px 12px rgba(26,46,7,0.07)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(220,38,38,0.1)" }}
              >
                <Users size={18} style={{ color: "#DC2626" }} />
              </div>
              <div className="flex-1 text-left">
                <p
                  className="text-sm"
                  style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
                >
                  User Management
                </p>
                <p
                  className="text-xs"
                  style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Manage users and permissions
                </p>
              </div>
              <ChevronRight size={16} style={{ color: "#D1D5DB" }} />
            </button>
          </div>
        )}

        {/* Settings */}
        <div className="px-5 mt-5">
          <p
            className="text-xs mb-3"
            style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}
          >
            Settings
          </p>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "white", boxShadow: "0 2px 12px rgba(26,46,7,0.07)" }}
          >
            {settings.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="flex items-center gap-3 px-4 py-3.5"
                  style={{ borderBottom: i < settings.length - 1 ? "1px solid #F3F4F6" : "none" }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${s.color}18` }}
                  >
                    <Icon size={17} style={{ color: s.color }} />
                  </div>
                  <span
                    className="flex-1 text-sm"
                    style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}
                  >
                    {s.label}
                  </span>
                  {s.toggle && s.key ? (
                    <button
                      onClick={() => flip(s.key!)}
                      className="relative w-11 h-6 rounded-full transition-colors duration-200"
                      style={{ background: toggles[s.key] ? "#7AB418" : "#E5E7EB" }}
                    >
                      <div
                        className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200"
                        style={{
                          transform: `translateX(${toggles[s.key] ? "22px" : "4px"})`,
                          boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                        }}
                      />
                    </button>
                  ) : (
                    <ChevronRight size={16} style={{ color: "#D1D5DB" }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Logout */}
        <div className="px-5 mt-4 mb-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm"
            style={{
              background: "rgba(239,68,68,0.06)",
              border: "1.5px solid rgba(239,68,68,0.15)",
              color: "#DC2626",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <p
          className="text-center text-xs pb-4"
          style={{ color: "#D1D5DB", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          WorkTrack v1.0.0 · © 2026 Puducherry Municipal
        </p>
      </div>
    </div>
  );
}