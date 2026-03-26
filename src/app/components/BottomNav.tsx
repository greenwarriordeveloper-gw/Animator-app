import { useNavigate, useLocation } from "react-router";
import { Home, Users, BarChart2, User } from "lucide-react";
import { motion } from "motion/react";

const navItems = [
  { icon: Home,      label: "Home",    path: "/home" },
  { icon: Users,     label: "Workers", path: "/workers" },
  { icon: BarChart2, label: "Reports", path: "/reports" },
  { icon: User,      label: "Profile", path: "/profile" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 flex items-center justify-around px-2 pb-5 pt-2 z-50"
      style={{
        background: "white",
        boxShadow: "0 -4px 24px rgba(26,46,7,0.08)",
        borderTop: "1px solid #F3F4F6",
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path ||
          (item.path === "/reports" && (
            location.pathname === "/reports" ||
            location.pathname === "/pdf-preview" ||
            location.pathname === "/punch-status"
          ));

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-1 flex-1 py-1 relative"
          >
            {isActive && (
              <motion.div
                layoutId="navActive"
                className="absolute -top-2 w-8 h-1 rounded-b-full"
                style={{ background: "#7AB418" }}
              />
            )}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: isActive ? "rgba(122,180,24,0.1)" : "transparent",
              }}
            >
              <Icon
                size={20}
                style={{
                  color: isActive ? "#7AB418" : "#9CA3AF",
                  strokeWidth: isActive ? 2.5 : 1.8,
                }}
              />
            </div>
            <span
              style={{
                color: isActive ? "#7AB418" : "#9CA3AF",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: isActive ? 700 : 500,
                fontSize: 10,
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
