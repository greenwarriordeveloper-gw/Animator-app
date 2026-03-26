import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, MapPin, Search, Filter, User as UserIcon, CalendarDays } from "lucide-react";
import { useState } from "react";

export default function BulkHistoryScreen() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"worker" | "date">("worker");

  const statusFilters = ["All", "Present", "Absent", "Half Day", "Not Marked"];
  const [selectedStatus, setSelectedStatus] = useState("All");

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#F8FAFC" }}>
      {/* Header */}
      <div
        className="flex-shrink-0 px-5 pt-12 pb-4"
        style={{ background: "linear-gradient(135deg, #1A2E07, #2A4710)" }}
      >
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl flex items-center justify-center active:scale-95 transition-transform"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <ArrowLeft size={18} color="white" />
          </button>
          <div className="flex-1">
            <p className="text-base" style={{ color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
              Bulk History
            </p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              View all workers by date range
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Filter Section */}
        <div className="px-5 mt-4">
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="rounded-2xl p-4 space-y-3"
            style={{ background: "white", boxShadow: "0 2px 12px rgba(26,46,7,0.07)" }}
          >
            {/* Date Range */}
            <div>
              <p className="text-xs mb-2" style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                Date Range
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <Calendar size={14} style={{ color: "#9CA3AF", position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
                  <input
                    type="date"
                    className="w-full pl-8 pr-3 py-2.5 rounded-lg border-none outline-none"
                    style={{
                      background: "#F9FAFB",
                      color: "#1A2E07",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 12,
                    }}
                  />
                </div>
                <div className="relative">
                  <Calendar size={14} style={{ color: "#9CA3AF", position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
                  <input
                    type="date"
                    className="w-full pl-8 pr-3 py-2.5 rounded-lg border-none outline-none"
                    style={{
                      background: "#F9FAFB",
                      color: "#1A2E07",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 12,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Zone/Municipality */}
            <div>
              <p className="text-xs mb-2" style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                Zone/Municipality
              </p>
              <div className="relative">
                <MapPin size={14} style={{ color: "#9CA3AF", position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
                <select
                  className="w-full pl-8 pr-3 py-2.5 rounded-lg border-none outline-none"
                  style={{
                    background: "#F9FAFB",
                    color: "#1A2E07",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 12,
                  }}
                >
                  <option>All Zones</option>
                  <option>Zone 1</option>
                  <option>Zone 2</option>
                  <option>Zone 3</option>
                  <option>Zone 4</option>
                </select>
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <p className="text-xs mb-2" style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                Status Filter
              </p>
              <div className="flex flex-wrap gap-2">
                {statusFilters.map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className="px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
                    style={{
                      background: selectedStatus === status ? "linear-gradient(135deg, #7AB418, #5E8C12)" : "#F9FAFB",
                      color: selectedStatus === status ? "white" : "#6B7280",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: 11,
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search size={14} style={{ color: "#9CA3AF", position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Search by worker name/ID"
                className="w-full pl-8 pr-3 py-2.5 rounded-lg border-none outline-none"
                style={{
                  background: "#F9FAFB",
                  color: "#1A2E07",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 12,
                }}
              />
            </div>

            {/* Apply Button */}
            <button
              className="w-full py-3 rounded-xl active:scale-[0.98] transition-transform"
              style={{
                background: "linear-gradient(135deg, #7AB418, #5E8C12)",
                color: "white",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                boxShadow: "0 4px 12px rgba(122,180,24,0.25)",
              }}
            >
              Apply Filter
            </button>
          </motion.div>
        </div>

        {/* View Toggle */}
        <div className="px-5 mt-4">
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl p-1 flex"
            style={{ background: "white", boxShadow: "0 2px 12px rgba(26,46,7,0.07)" }}
          >
            <button
              onClick={() => setViewMode("worker")}
              className="flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all"
              style={{
                background: viewMode === "worker" ? "linear-gradient(135deg, #7AB418, #5E8C12)" : "transparent",
                color: viewMode === "worker" ? "white" : "#6B7280",
              }}
            >
              <UserIcon size={14} />
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 12 }}>
                By Worker
              </span>
            </button>
            <button
              onClick={() => setViewMode("date")}
              className="flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all"
              style={{
                background: viewMode === "date" ? "linear-gradient(135deg, #7AB418, #5E8C12)" : "transparent",
                color: viewMode === "date" ? "white" : "#6B7280",
              }}
            >
              <CalendarDays size={14} />
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 12 }}>
                By Date
              </span>
            </button>
          </motion.div>
        </div>

        {/* Empty State */}
        <div className="px-5 mt-6">
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-8 text-center"
            style={{ background: "white", boxShadow: "0 2px 12px rgba(26,46,7,0.07)" }}
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: "rgba(122,180,24,0.1)" }}
            >
              <Filter size={28} style={{ color: "#7AB418" }} />
            </div>
            <h3 className="text-sm mb-2" style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
              Apply Filters to View History
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Select a date range and zone to view bulk attendance records. You can view data organized by worker or by date.
            </p>
          </motion.div>
        </div>

        {/* Info Card */}
        <div className="px-5 mt-4">
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl p-4"
            style={{ background: "rgba(122,180,24,0.08)", border: "1px solid rgba(122,180,24,0.2)" }}
          >
            <p className="text-xs leading-relaxed mb-3" style={{ color: "#5E8C12", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <strong>View Options:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-xs" style={{ color: "#5E8C12", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span>👤</span>
                <span><strong>By Worker:</strong> See each worker's attendance across the date range</span>
              </li>
              <li className="flex items-start gap-2 text-xs" style={{ color: "#5E8C12", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span>📅</span>
                <span><strong>By Date:</strong> See all workers' attendance for each day</span>
              </li>
              <li className="flex items-start gap-2 text-xs" style={{ color: "#5E8C12", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span>📊</span>
                <span>Export selected records to PDF or Excel format</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
