import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { LogIn, Eye, EyeOff, User, Lock } from "lucide-react";
import { login, initUsers } from "../utils/auth";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize users database on mount
  useState(() => {
    initUsers();
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = login(username.trim(), password);

    if (user) {
      navigate("/home", { replace: true });
    } else {
      setError("Invalid username or password");
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: "linear-gradient(135deg, #1A2E07 0%, #2A4710 50%, #1A2E07 100%)",
      }}
    >
      {/* Header */}
      <div className="flex-shrink-0 pt-16 pb-8 px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-6"
        >
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #7AB418, #8FCC20)",
              boxShadow: "0 8px 32px rgba(122,180,24,0.3)",
            }}
          >
            <span style={{ fontSize: 36 }}>📋</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center text-3xl mb-2"
          style={{
            color: "white",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
          }}
        >
          GW Attendance App
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
          style={{
            color: "rgba(255,255,255,0.6)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 14,
          }}
        >
          Attendance Tracking System
        </motion.p>
      </div>

      {/* Login Form */}
      <div className="flex-1 px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="rounded-3xl p-6"
          style={{
            background: "white",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          }}
        >
          <h2
            className="text-xl mb-6"
            style={{
              color: "#1A2E07",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
            }}
          >
            Sign In
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username */}
            <div>
              <label
                className="block text-sm mb-2"
                style={{
                  color: "#374151",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                Username
              </label>
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{
                  background: "#F9FAFB",
                  border: "1.5px solid #E5E7EB",
                }}
              >
                <User size={18} style={{ color: "#9CA3AF" }} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="flex-1 bg-transparent outline-none"
                  style={{
                    color: "#111827",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 14,
                  }}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-sm mb-2"
                style={{
                  color: "#374151",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                Password
              </label>
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{
                  background: "#F9FAFB",
                  border: "1.5px solid #E5E7EB",
                }}
              >
                <Lock size={18} style={{ color: "#9CA3AF" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="flex-1 bg-transparent outline-none"
                  style={{
                    color: "#111827",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 14,
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1"
                >
                  {showPassword ? (
                    <EyeOff size={18} style={{ color: "#9CA3AF" }} />
                  ) : (
                    <Eye size={18} style={{ color: "#9CA3AF" }} />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 rounded-xl"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                }}
              >
                <p
                  className="text-sm"
                  style={{
                    color: "#DC2626",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {error}
                </p>
              </motion.div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
              style={{
                background: loading
                  ? "#9CA3AF"
                  : "linear-gradient(135deg, #1A2E07, #2A4710)",
                color: "white",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                boxShadow: loading
                  ? "none"
                  : "0 4px 16px rgba(26,46,7,0.3)",
              }}
            >
              {loading ? (
                <>
                  <div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                  />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6" style={{ borderTop: "1px solid #E5E7EB" }}>
            <p
              className="text-xs mb-3"
              style={{
                color: "#6B7280",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Demo Credentials
            </p>
            <div className="space-y-2">
              {[
                { role: "Admin", user: "admin", pass: "admin123" },
                { role: "Manager", user: "manager1", pass: "manager123" },
                { role: "Animator", user: "animator_kowsalya", pass: "anim123" },
              ].map((cred) => (
                <div
                  key={cred.role}
                  className="flex items-center justify-between px-3 py-2 rounded-lg"
                  style={{ background: "#F9FAFB" }}
                >
                  <div>
                    <p
                      className="text-xs"
                      style={{
                        color: "#1A2E07",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      {cred.role}
                    </p>
                    <p
                      className="text-xs"
                      style={{
                        color: "#6B7280",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      {cred.user} / {cred.pass}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setUsername(cred.user);
                      setPassword(cred.pass);
                    }}
                    className="px-3 py-1 rounded-lg text-xs"
                    style={{
                      background: "rgba(122,180,24,0.1)",
                      color: "#5E8C12",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Use
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 py-6 px-6">
        <p
          className="text-center text-xs"
          style={{
            color: "rgba(255,255,255,0.4)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Secure attendance management system
        </p>
      </div>
    </div>
  );
}
