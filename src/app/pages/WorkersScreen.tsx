import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Search, Filter, Camera, CheckCircle2, Edit2, Trash2, History, X, Clock } from "lucide-react";
import { WORKERS, TOTAL, Worker, getWorkersByAnimator, getStatsForAnimator } from "../data/workers";
import { getUser, isAnimator, isAdmin } from "../utils/auth";
import { addHistory, getHistory } from "../utils/history";

type FilterTab = "All" | "Present" | "Absent" | "Not Taken" | "Half Day";

const FILTER_TABS: FilterTab[] = ["All", "Present", "Absent", "Not Taken", "Half Day"];

const STATUS_CONFIG: Record<string, { bg: string; color: string; dot: string }> = {
  Present:    { bg: "rgba(34,197,94,0.1)",    color: "#16A34A", dot: "#22C55E" },
  Absent:     { bg: "rgba(239,68,68,0.1)",    color: "#DC2626", dot: "#EF4444" },
  "Not Taken":{ bg: "rgba(245,158,11,0.12)",  color: "#D97706", dot: "#F59E0B" },
  "Half Day": { bg: "rgba(122,180,24,0.1)",   color: "#5E8C12", dot: "#7AB418" },
};

function WorkerCard({ worker, onMark, onEdit, onDelete, showAdminActions }: { 
  worker: Worker; 
  onMark: (id: string) => void;
  onEdit?: (worker: Worker) => void;
  onDelete?: (worker: Worker) => void;
  showAdminActions?: boolean;
}) {
  const s = STATUS_CONFIG[worker.status];
  const isDone = worker.status !== "Not Taken";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-4 flex items-center gap-3"
      style={{
        background: "white",
        boxShadow: "0 2px 10px rgba(26,46,7,0.06)",
        opacity: worker.status === "Absent" ? 0.8 : 1,
      }}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: `${worker.color}22`,
            border: `1.5px solid ${worker.color}44`,
            filter: worker.status === "Not Taken" ? "grayscale(0.5)" : "none",
          }}
        >
          <span
            style={{
              color: worker.color,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            {worker.initials}
          </span>
        </div>
        {isDone && (
          <div
            className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: "white" }}
          >
            <CheckCircle2 size={14} style={{ color: s.dot }} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm" style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
          {worker.name}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {worker.id}
        </p>
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className="text-xs px-1.5 py-0.5 rounded"
            style={{ background: "#F3F4F6", color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 9 }}
          >
            {worker.zone}
          </span>
        </div>
      </div>

      {/* Status + action */}
      <div className="flex flex-col items-end gap-2">
        <span
          className="text-xs px-2.5 py-1 rounded-full"
          style={{ background: s.bg, color: s.color, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
        >
          {worker.status}
        </span>
        
        {/* Admin actions */}
        {showAdminActions && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onEdit?.(worker)}
              className="w-7 h-7 rounded-lg flex items-center justify-center active:scale-95 transition-transform"
              style={{
                background: "rgba(122,180,24,0.1)",
                border: "1px solid rgba(122,180,24,0.2)",
              }}
            >
              <Edit2 size={12} style={{ color: "#7AB418" }} />
            </button>
            <button
              onClick={() => onDelete?.(worker)}
              className="w-7 h-7 rounded-lg flex items-center justify-center active:scale-95 transition-transform"
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
              }}
            >
              <Trash2 size={12} style={{ color: "#DC2626" }} />
            </button>
          </div>
        )}
        
        {/* Mark attendance button */}
        {!showAdminActions && worker.status === "Not Taken" && (
          <button
            onClick={() => onMark(worker.id)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs active:scale-95 transition-transform"
            style={{
              background: "linear-gradient(135deg, #7AB418, #5E8C12)",
              color: "white",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
            }}
          >
            <Camera size={11} />
            Mark
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function WorkersScreen() {
  const navigate = useNavigate();
  const user = getUser();
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [search, setSearch] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [editName, setEditName] = useState("");
  const [editStatus, setEditStatus] = useState<Worker["status"]>("Present");
  
  // Filter workers based on role
  const allWorkers = user && isAnimator(user) 
    ? getWorkersByAnimator(user.id)
    : WORKERS;
  
  const [workers, setWorkers] = useState(allWorkers);
  
  const totalWorkers = workers.length;
  const notTaken = workers.filter(w => w.status === "Not Taken").length;
  const done = totalWorkers - notTaken;

  const filtered = workers.filter(w => {
    const matchesTab = activeTab === "All" || w.status === activeTab;
    const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase()) || w.id.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Sort: Not Taken first
  const sorted = [
    ...filtered.filter(w => w.status === "Not Taken"),
    ...filtered.filter(w => w.status !== "Not Taken"),
  ];

  const markWorker = (id: string) => {
    navigate("/camera");
  };

  const handleEdit = (worker: Worker) => {
    setSelectedWorker(worker);
    setEditName(worker.name);
    setEditStatus(worker.status);
    setShowEditModal(true);
  };

  const handleDelete = (worker: Worker) => {
    setSelectedWorker(worker);
    setShowDeleteModal(true);
  };

  const confirmEdit = () => {
    if (!selectedWorker || !user) return;
    
    const changes: { field: string; oldValue: string; newValue: string }[] = [];
    if (editName !== selectedWorker.name) {
      changes.push({ field: "name", oldValue: selectedWorker.name, newValue: editName });
    }
    if (editStatus !== selectedWorker.status) {
      changes.push({ field: "status", oldValue: selectedWorker.status, newValue: editStatus });
    }

    // Update worker
    setWorkers(prev => prev.map(w => 
      w.id === selectedWorker.id 
        ? { ...w, name: editName, status: editStatus }
        : w
    ));

    // Add to history
    addHistory({
      action: "edit",
      performedBy: user.name,
      performedByRole: user.role,
      performedById: user.id,
      targetType: "worker",
      targetId: selectedWorker.id,
      targetName: selectedWorker.name,
      changes,
      details: `Updated ${changes.map(c => c.field).join(", ")}`,
    });

    setShowEditModal(false);
    setSelectedWorker(null);
  };

  const confirmDelete = () => {
    if (!selectedWorker || !user) return;

    // Remove worker
    setWorkers(prev => prev.filter(w => w.id !== selectedWorker.id));

    // Add to history
    addHistory({
      action: "delete",
      performedBy: user.name,
      performedByRole: user.role,
      performedById: user.id,
      targetType: "worker",
      targetId: selectedWorker.id,
      targetName: selectedWorker.name,
      details: `Deleted worker ${selectedWorker.name} (${selectedWorker.id})`,
    });

    setShowDeleteModal(false);
    setSelectedWorker(null);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#F8FAFC" }}>
      {/* Header */}
      <div
        className="flex-shrink-0 px-5 pt-12 pb-4"
        style={{ background: "linear-gradient(135deg, #1A2E07, #2A4710)" }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl" style={{ color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
              My Workers ({totalWorkers})
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {isAdmin(user) && (
              <button
                onClick={() => setShowHistoryModal(true)}
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                <History size={16} color="white" />
              </button>
            )}
            <button
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <Filter size={16} color="white" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.4)" }} />
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl outline-none text-sm"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          />
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {FILTER_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs transition-all"
              style={{
                background: activeTab === tab ? "#7AB418" : "rgba(255,255,255,0.1)",
                color: activeTab === tab ? "white" : "rgba(255,255,255,0.5)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Sticky progress sub-header */}
      <div
        className="flex-shrink-0 px-5 py-2.5 flex items-center justify-between"
        style={{ background: "white", borderBottom: "1px solid #F3F4F6" }}
      >
        <span className="text-xs" style={{ color: "#F59E0B", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
          ⏳ Pending: {notTaken}
        </span>
        <span className="text-xs" style={{ color: "#16A34A", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
          ✅ Done: {done}
        </span>
      </div>

      {/* Worker list */}
      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-24 flex flex-col gap-3">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-12 gap-3">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "rgba(26,46,7,0.06)" }}
            >
              <Search size={24} style={{ color: "#D1D5DB" }} />
            </div>
            <p className="text-sm" style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              No workers found
            </p>
          </div>
        ) : (
          sorted.map((w, i) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <WorkerCard worker={w} onMark={markWorker} showAdminActions={isAdmin(user)} onEdit={handleEdit} onDelete={handleDelete} />
            </motion.div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedWorker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4" style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Edit Worker
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Name
              </label>
              <input
                type="text"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Status
              </label>
              <select
                value={editStatus}
                onChange={e => setEditStatus(e.target.value as Worker["status"])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Not Taken">Not Taken</option>
                <option value="Half Day">Half Day</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md mr-2"
                onClick={() => setShowEditModal(false)}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md"
                onClick={confirmEdit}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedWorker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4" style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Delete Worker
            </h3>
            <p className="text-sm mb-4" style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Are you sure you want to delete worker <strong>{selectedWorker.name}</strong>?
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md mr-2"
                onClick={() => setShowDeleteModal(false)}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={confirmDelete}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg" style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
                  📜 Action History
                </h3>
                <p className="text-xs mt-0.5" style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  All edit and delete actions with timestamps
                </p>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X size={18} style={{ color: "#6B7280" }} />
              </button>
            </div>

            {/* History List */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {getHistory().length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(26,46,7,0.06)" }}
                  >
                    <History size={24} style={{ color: "#D1D5DB" }} />
                  </div>
                  <p className="text-sm" style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    No history yet
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {getHistory().map((entry, i) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="rounded-xl p-4"
                      style={{
                        background: entry.action === "delete" ? "rgba(239,68,68,0.05)" : "rgba(122,180,24,0.05)",
                        border: `1px solid ${entry.action === "delete" ? "rgba(239,68,68,0.1)" : "rgba(122,180,24,0.1)"}`,
                      }}
                    >
                      {/* Action header */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="px-2 py-0.5 rounded-full text-xs"
                            style={{
                              background: entry.action === "delete" ? "rgba(239,68,68,0.1)" : "rgba(122,180,24,0.1)",
                              color: entry.action === "delete" ? "#DC2626" : "#7AB418",
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              fontWeight: 700,
                            }}
                          >
                            {entry.action === "delete" ? "🗑️ DELETED" : "✏️ EDITED"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs" style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          <Clock size={11} />
                          {entry.time}
                        </div>
                      </div>

                      {/* Target info */}
                      <p className="text-sm mb-1" style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                        {entry.targetName}
                      </p>
                      <p className="text-xs mb-2" style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {entry.details}
                      </p>

                      {/* Changes */}
                      {entry.changes && entry.changes.length > 0 && (
                        <div className="mt-2 pt-2 border-t" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
                          {entry.changes.map((change, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs mb-1">
                              <span style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                {change.field}:
                              </span>
                              <span
                                className="px-1.5 py-0.5 rounded"
                                style={{ background: "rgba(239,68,68,0.1)", color: "#DC2626", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                              >
                                {change.oldValue}
                              </span>
                              <span style={{ color: "#9CA3AF" }}>→</span>
                              <span
                                className="px-1.5 py-0.5 rounded"
                                style={{ background: "rgba(34,197,94,0.1)", color: "#16A34A", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                              >
                                {change.newValue}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Performed by */}
                      <div className="mt-2 pt-2 border-t flex items-center justify-between" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
                        <div className="flex items-center gap-2">
                          <span className="text-xs" style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            By:
                          </span>
                          <span className="text-xs" style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                            {entry.performedBy}
                          </span>
                          <span
                            className="px-1.5 py-0.5 rounded text-xs"
                            style={{
                              background: entry.performedByRole === "admin" ? "rgba(239,68,68,0.1)" : "rgba(122,180,24,0.1)",
                              color: entry.performedByRole === "admin" ? "#DC2626" : "#7AB418",
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              fontWeight: 600,
                            }}
                          >
                            {entry.performedByRole.toUpperCase()}
                          </span>
                        </div>
                        <span className="text-xs" style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {entry.date}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}