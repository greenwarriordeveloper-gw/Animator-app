import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ChevronLeft,
  Plus,
  Search,
  Edit2,
  Trash2,
  UserPlus,
  Shield,
  Users,
  User,
  MapPin,
  X,
} from "lucide-react";
import {
  getAllUsers,
  saveAllUsers,
  getUser,
  canManageUsers,
  type AuthUser,
  type UserRole,
} from "../utils/auth";

// Available constituencies in Puducherry
const CONSTITUENCIES = [
  "Thattanchavady",
  "Ozhukarai",
  "Villianur",
  "Kadirkamam",
  "Indira Nagar",
  "Kamaraj Nagar",
  "Muthialpet",
  "Mudaliarpet",
  "Raj Bhavan",
  "Embalam",
  "Nellithope",
  "Lawspet",
  "Kalapet",
  "Murungapakkam",
  "Nettapakkam",
  "Manapet",
  "Ariankuppam",
  "Bahour",
  "Karaikal",
  "Mahe",
  "Yanam",
];

const ROLE_CONFIG: Record<UserRole, { label: string; color: string; bg: string; icon: string }> = {
  admin: { label: "Admin", color: "#DC2626", bg: "rgba(239,68,68,0.1)", icon: "🛡️" },
  manager: { label: "Manager", color: "#7AB418", bg: "rgba(122,180,24,0.1)", icon: "👔" },
  animator: { label: "Animator", color: "#2563EB", bg: "rgba(37,99,235,0.1)", icon: "👤" },
};

export default function UserManagementScreen() {
  const navigate = useNavigate();
  const currentUser = getUser();
  const [users, setUsers] = useState<AuthUser[]>(getAllUsers());
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AuthUser | null>(null);

  // Redirect if not admin
  if (!canManageUsers(currentUser)) {
    navigate("/home", { replace: true });
    return null;
  }

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.empId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteUser = (userId: string) => {
    if (userId === currentUser?.id) {
      alert("Cannot delete your own account");
      return;
    }
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updated = users.filter((u) => u.id !== userId);
      setUsers(updated);
      saveAllUsers(updated);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#F8FAFC" }}>
      {/* Header */}
      <div
        className="flex-shrink-0 px-5 pt-12 pb-5"
        style={{ background: "linear-gradient(135deg, #1A2E07, #2A4710)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/home")}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <ChevronLeft size={20} color="white" />
            </button>
            <div>
              <h2
                className="text-xl"
                style={{
                  color: "white",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                }}
              >
                User Management
              </h2>
              <p
                className="text-xs"
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {users.length} total users
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "rgba(122,180,24,0.2)",
              border: "1px solid rgba(122,180,24,0.3)",
            }}
          >
            <Plus size={18} style={{ color: "#8FCC20" }} />
          </button>
        </div>

        {/* Search Bar */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <Search size={18} style={{ color: "rgba(255,255,255,0.6)" }} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none"
            style={{
              color: "white",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 14,
            }}
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto px-5 py-5 pb-28">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            {
              label: "Admins",
              value: users.filter((u) => u.role === "admin").length,
              color: "#DC2626",
              bg: "rgba(239,68,68,0.08)",
            },
            {
              label: "Managers",
              value: users.filter((u) => u.role === "manager").length,
              color: "#7AB418",
              bg: "rgba(122,180,24,0.08)",
            },
            {
              label: "Animators",
              value: users.filter((u) => u.role === "animator").length,
              color: "#2563EB",
              bg: "rgba(37,99,235,0.08)",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-3 flex flex-col items-center gap-1"
              style={{ background: stat.bg }}
            >
              <span
                className="text-2xl"
                style={{
                  color: stat.color,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs"
                style={{
                  color: stat.color,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  opacity: 0.7,
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* User Cards */}
        <div className="space-y-3">
          {filteredUsers.map((user) => {
            const roleConfig = ROLE_CONFIG[user.role];
            return (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl p-4"
                style={{
                  background: "white",
                  boxShadow: "0 2px 10px rgba(26,46,7,0.08)",
                }}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: roleConfig.bg }}
                  >
                    <span style={{ fontSize: 20 }}>{roleConfig.icon}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex-1 min-w-0">
                        <h3
                          className="truncate"
                          style={{
                            color: "#111827",
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: 15,
                            fontWeight: 700,
                          }}
                        >
                          {user.name}
                        </h3>
                        <p
                          className="text-xs truncate"
                          style={{
                            color: "#6B7280",
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                          }}
                        >
                          @{user.username}
                        </p>
                      </div>
                      <span
                        className="px-2 py-1 rounded-lg text-xs whitespace-nowrap"
                        style={{
                          background: roleConfig.bg,
                          color: roleConfig.color,
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 700,
                        }}
                      >
                        {roleConfig.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="text-xs"
                        style={{
                          color: "#1A2E07",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        ID: {user.empId}
                      </span>
                      {user.zone && (
                        <>
                          <span style={{ color: "#D1D5DB" }}>•</span>
                          <span
                            className="text-xs"
                            style={{
                              color: "#6B7280",
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}
                          >
                            {user.zone}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Constituencies */}
                    {user.constituencies && user.constituencies.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs mb-1.5" style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                          📍 Constituencies ({user.constituencies.length})
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {user.constituencies.slice(0, 3).map((constituency) => (
                            <span
                              key={constituency}
                              className="px-2 py-0.5 rounded text-xs"
                              style={{
                                background: "rgba(122,180,24,0.1)",
                                color: "#5E8C12",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                fontWeight: 500,
                              }}
                            >
                              {constituency}
                            </span>
                          ))}
                          {user.constituencies.length > 3 && (
                            <span
                              className="px-2 py-0.5 rounded text-xs"
                              style={{
                                background: "rgba(107,114,128,0.1)",
                                color: "#6B7280",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                fontWeight: 600,
                              }}
                            >
                              +{user.constituencies.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="flex-1 py-2 rounded-lg flex items-center justify-center gap-2 text-xs"
                        style={{
                          background: "rgba(122,180,24,0.1)",
                          color: "#5E8C12",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        <Edit2 size={14} />
                        Edit
                      </button>
                      {user.id !== currentUser?.id && (
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="px-3 py-2 rounded-lg flex items-center justify-center"
                          style={{
                            background: "rgba(239,68,68,0.1)",
                            color: "#DC2626",
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(122,180,24,0.1)" }}
            >
              <Users size={28} style={{ color: "#7AB418" }} />
            </div>
            <p
              className="text-sm"
              style={{
                color: "#6B7280",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              No users found
            </p>
          </div>
        )}
      </div>

      {/* Add/Edit User Modal */}
      {(showAddModal || editingUser) && (
        <UserFormModal
          user={editingUser}
          onClose={() => {
            setShowAddModal(false);
            setEditingUser(null);
          }}
          onSave={(user) => {
            if (editingUser) {
              const updated = users.map((u) => (u.id === user.id ? user : u));
              setUsers(updated);
              saveAllUsers(updated);
            } else {
              const updated = [...users, user];
              setUsers(updated);
              saveAllUsers(updated);
            }
            setShowAddModal(false);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
}

// User Form Modal Component
function UserFormModal({
  user,
  onClose,
  onSave,
}: {
  user: AuthUser | null;
  onClose: () => void;
  onSave: (user: AuthUser) => void;
}) {
  const [formData, setFormData] = useState<AuthUser>(
    user || {
      id: `USR-${Date.now()}`,
      username: "",
      password: "",
      name: "",
      empId: "",
      role: "animator",
      zone: "",
      supervisor: "",
      constituencies: [],
    }
  );

  const toggleConstituency = (constituency: string) => {
    const current = formData.constituencies || [];
    const updated = current.includes(constituency)
      ? current.filter(c => c !== constituency)
      : [...current, constituency];
    setFormData({ ...formData, constituencies: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-5"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md rounded-3xl p-6"
        style={{ background: "white", maxHeight: "80vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          className="text-xl mb-5"
          style={{
            color: "#1A2E07",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
          }}
        >
          {user ? "Edit User" : "Add New User"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs mb-2" style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl outline-none"
              style={{ background: "#F9FAFB", border: "1.5px solid #E5E7EB", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14 }}
              required
            />
          </div>

          <div>
            <label className="block text-xs mb-2" style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
              Username *
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 rounded-xl outline-none"
              style={{ background: "#F9FAFB", border: "1.5px solid #E5E7EB", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14 }}
              required
            />
          </div>

          <div>
            <label className="block text-xs mb-2" style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
              Password *
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 rounded-xl outline-none"
              style={{ background: "#F9FAFB", border: "1.5px solid #E5E7EB", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14 }}
              required
            />
          </div>

          <div>
            <label className="block text-xs mb-2" style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
              Employee ID *
            </label>
            <input
              type="text"
              value={formData.empId}
              onChange={(e) => setFormData({ ...formData, empId: e.target.value })}
              className="w-full px-4 py-3 rounded-xl outline-none"
              style={{ background: "#F9FAFB", border: "1.5px solid #E5E7EB", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14 }}
              required
            />
          </div>

          <div>
            <label className="block text-xs mb-2" style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
              Role *
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
              className="w-full px-4 py-3 rounded-xl outline-none"
              style={{ background: "#F9FAFB", border: "1.5px solid #E5E7EB", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14 }}
              required
            >
              <option value="animator">Animator</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {(formData.role === "animator" || formData.role === "manager") && (
            <div>
              <label className="block text-xs mb-2" style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                Zone
              </label>
              <select
                value={formData.zone || ""}
                onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl outline-none"
                style={{ background: "#F9FAFB", border: "1.5px solid #E5E7EB", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14 }}
                placeholder="e.g., Zone 4"
              >
                <option value="">Select Zone</option>
                {CONSTITUENCIES.map((constituency) => (
                  <option key={constituency} value={constituency}>
                    {constituency}
                  </option>
                ))}
              </select>
            </div>
          )}

          {formData.role === "animator" && (
            <div>
              <label className="block text-xs mb-2" style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                Supervisor
              </label>
              <input
                type="text"
                value={formData.supervisor || ""}
                onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                className="w-full px-4 py-3 rounded-xl outline-none"
                style={{ background: "#F9FAFB", border: "1.5px solid #E5E7EB", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14 }}
                placeholder="Supervisor name"
              />
            </div>
          )}

          {/* Constituencies - Admin can assign multiple */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs" style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                📍 Assigned Constituencies
              </label>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(122,180,24,0.1)", color: "#7AB418", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                {(formData.constituencies || []).length} selected
              </span>
            </div>
            <div 
              className="rounded-xl p-3 max-h-48 overflow-y-auto"
              style={{ background: "#F9FAFB", border: "1.5px solid #E5E7EB" }}
            >
              <div className="grid grid-cols-2 gap-2">
                {CONSTITUENCIES.map((constituency) => {
                  const isSelected = (formData.constituencies || []).includes(constituency);
                  return (
                    <button
                      key={constituency}
                      type="button"
                      onClick={() => toggleConstituency(constituency)}
                      className="px-3 py-2 rounded-lg text-xs text-left transition-all"
                      style={{
                        background: isSelected ? "rgba(122,180,24,0.15)" : "white",
                        border: `1.5px solid ${isSelected ? "#7AB418" : "#E5E7EB"}`,
                        color: isSelected ? "#5E8C12" : "#6B7280",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: isSelected ? 600 : 500,
                      }}
                    >
                      {isSelected && "✓ "}{constituency}
                    </button>
                  );
                })}
              </div>
            </div>
            <p className="text-xs mt-1.5" style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Select one or more constituencies for this user
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl"
              style={{
                background: "#F3F4F6",
                color: "#6B7280",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl"
              style={{
                background: "linear-gradient(135deg, #1A2E07, #2A4710)",
                color: "white",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
              }}
            >
              {user ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}