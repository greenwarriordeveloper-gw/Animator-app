import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Search, Calendar, Download, FileSpreadsheet } from "lucide-react";

export default function IndividualHistoryScreen() {
  const navigate = useNavigate();

  const recentSearches = ["EMP-00456", "EMP-00457", "EMP-00458"];

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
              Individual History
            </p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              View single worker's attendance log
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Search Section */}
        <div className="px-5 mt-4">
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="rounded-2xl p-4"
            style={{ background: "white", boxShadow: "0 2px 12px rgba(26,46,7,0.07)" }}
          >
            {/* Search Bar */}
            <div className="relative mb-3">
              <Search size={16} style={{ color: "#9CA3AF", position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Search by Name or Employee ID"
                className="w-full pl-10 pr-4 py-3 rounded-xl border-none outline-none"
                style={{
                  background: "#F9FAFB",
                  color: "#1A2E07",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 14,
                }}
              />
            </div>

            {/* Recent Searches */}
            <div>
              <p className="text-xs mb-2" style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                Recent Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    className="px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
                    style={{
                      background: "rgba(122,180,24,0.08)",
                      color: "#5E8C12",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: 11,
                    }}
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Empty State */}
        <div className="px-5 mt-6">
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-8 text-center"
            style={{ background: "white", boxShadow: "0 2px 12px rgba(26,46,7,0.07)" }}
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: "rgba(122,180,24,0.1)" }}
            >
              <Search size={28} style={{ color: "#7AB418" }} />
            </div>
            <h3 className="text-sm mb-2" style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
              Search for a Worker
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Enter a worker's name or Employee ID to view their complete attendance history
            </p>
          </motion.div>
        </div>

        {/* Info Card */}
        <div className="px-5 mt-4">
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl p-4"
            style={{ background: "rgba(122,180,24,0.08)", border: "1px solid rgba(122,180,24,0.2)" }}
          >
            <p className="text-xs leading-relaxed mb-3" style={{ color: "#5E8C12", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <strong>Features:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-xs" style={{ color: "#5E8C12", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span>📊</span>
                <span>Monthly summary with attendance statistics</span>
              </li>
              <li className="flex items-start gap-2 text-xs" style={{ color: "#5E8C12", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span>📅</span>
                <span>Day-by-day attendance log with check-in/out times</span>
              </li>
              <li className="flex items-start gap-2 text-xs" style={{ color: "#5E8C12", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span>📄</span>
                <span>Export individual reports to PDF or Excel</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
