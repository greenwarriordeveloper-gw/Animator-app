import { useNavigate, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, User, Users, ChevronRight } from "lucide-react";

export default function HistoryScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  // If mode is specified in URL, navigate to specific history view
  // For now, we show the mode selector home
  
  const modeCards = [
    {
      id: "individual",
      icon: User,
      title: "Individual History",
      description: "View single worker's complete attendance log",
      emoji: "👤",
      gradient: "linear-gradient(135deg, rgba(122,180,24,0.15), rgba(94,140,18,0.15))",
    },
    {
      id: "bulk",
      icon: Users,
      title: "Bulk History",
      description: "View all workers by date range or zone",
      emoji: "👥",
      gradient: "linear-gradient(135deg, rgba(122,180,24,0.15), rgba(94,140,18,0.15))",
    },
  ];

  const quickFilters = ["Today", "This Week", "This Month", "Custom Range"];

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
              Attendance History
            </p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Choose how to view records
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Mode Selector Cards */}
        <div className="px-5 mt-4 space-y-3">
          {modeCards.map((card, index) => (
            <motion.button
              key={card.id}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/history/${card.id}`)}
              className="w-full rounded-2xl p-5 flex items-start gap-4 active:scale-[0.98] transition-transform"
              style={{ background: "white", boxShadow: "0 2px 12px rgba(26,46,7,0.07)" }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: card.gradient }}
              >
                <span style={{ fontSize: 28 }}>{card.emoji}</span>
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-sm mb-1" style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
                  {card.title}
                </h3>
                <p className="text-xs leading-relaxed mb-2" style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {card.description}
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-xs" style={{ color: "#7AB418", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                    Tap to open
                  </span>
                  <ChevronRight size={12} style={{ color: "#7AB418" }} />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Quick Filter Chips */}
        <div className="px-5 mt-6">
          <h4 className="text-xs mb-3" style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
            Quick Filters
          </h4>
          <div className="flex flex-wrap gap-2">
            {quickFilters.map((filter, index) => (
              <motion.button
                key={filter}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="px-4 py-2 rounded-xl active:scale-95 transition-transform"
                style={{
                  background: index === 0 ? "linear-gradient(135deg, #7AB418, #5E8C12)" : "white",
                  color: index === 0 ? "white" : "#1A2E07",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 12,
                  boxShadow: index === 0 ? "0 4px 12px rgba(122,180,24,0.25)" : "0 2px 8px rgba(26,46,7,0.05)",
                }}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <div className="px-5 mt-6">
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl p-4"
            style={{ background: "rgba(122,180,24,0.08)", border: "1px solid rgba(122,180,24,0.2)" }}
          >
            <p className="text-xs leading-relaxed" style={{ color: "#5E8C12", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              💡 <strong>Tip:</strong> Use Individual History to track specific workers over time, or Bulk History to analyze attendance patterns across your team.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
