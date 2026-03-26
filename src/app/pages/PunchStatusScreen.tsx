import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ChevronLeft, Search, Download, CheckCircle2, Camera, Clock } from "lucide-react";
import { WORKERS } from "../data/workers";

type Tab = "Completed" | "Pending";

const completed = WORKERS.filter(w => w.status !== "Not Taken");
const pending   = WORKERS.filter(w => w.status === "Not Taken");

const STATUS_CONFIG: Record<string, { bg: string; color: string }> = {
  Present:    { bg: "rgba(34,197,94,0.1)",  color: "#16A34A" },
  Absent:     { bg: "rgba(239,68,68,0.1)",  color: "#DC2626" },
  "Half Day": { bg: "rgba(122,180,24,0.1)", color: "#5E8C12" },
};

export default function PunchStatusScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("Completed");
  const [search, setSearch] = useState("");

  const list = activeTab === "Completed" ? completed : pending;
  const filtered = list.filter(
    w => w.name.toLowerCase().includes(search.toLowerCase()) || w.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#F8FAFC" }}>
      {/* Header */}
      <div
        className="flex-shrink-0 px-5 pt-12 pb-4"
        style={{ background: "linear-gradient(135deg, #1A2E07, #2A4710)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <ChevronLeft size={20} color="white" />
            </button>
            <div>
              <h2 className="text-lg" style={{ color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
                Punch Status
              </h2>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                14 Mar 2026
              </p>
            </div>
          </div>
          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(122,180,24,0.2)", border: "1px solid rgba(122,180,24,0.3)" }}
          >
            <Download size={16} style={{ color: "#8FCC20" }} />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.35)" }} />
          <input
            type="text"
            placeholder="Search worker..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl outline-none text-sm"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          />
        </div>

        {/* Toggle tabs */}
        <div
          className="flex rounded-xl p-1"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          {(["Completed", "Pending"] as Tab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2.5 rounded-lg text-sm flex items-center justify-center gap-1.5 transition-all"
              style={{
                background: activeTab === tab ? "white" : "transparent",
                color: activeTab === tab ? "#1A2E07" : "rgba(255,255,255,0.5)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                boxShadow: activeTab === tab ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
              }}
            >
              {tab === "Completed" ? (
                <><CheckCircle2 size={14} /> Completed ✅ ({completed.length})</>
              ) : (
                <><Clock size={14} /> Pending ⏳ ({pending.length})</>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-24 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-16 gap-3">
            <p className="text-sm" style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              No workers found
            </p>
          </div>
        ) : (
          filtered.map((w, i) => {
            const isPending = w.status === "Not Taken";
            const s = isPending ? null : STATUS_CONFIG[w.status];
            return (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="rounded-2xl p-4 flex items-center gap-3"
                style={{ background: "white", boxShadow: "0 2px 10px rgba(26,46,7,0.06)" }}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center"
                    style={{
                      background: isPending ? "#F3F4F6" : `${w.color}22`,
                      border: isPending ? "1.5px solid #E5E7EB" : `1.5px solid ${w.color}44`,
                    }}
                  >
                    <span
                      style={{
                        color: isPending ? "#9CA3AF" : w.color,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: 12,
                      }}
                    >
                      {isPending ? "?" : w.initials}
                    </span>
                  </div>
                  {!isPending && (
                    <div
                      className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: "white" }}
                    >
                      <CheckCircle2 size={13} style={{ color: "#22C55E" }} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ color: isPending ? "#9CA3AF" : "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
                    {w.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {w.id}
                  </p>
                  {!isPending && w.checkIn !== "—" && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock size={10} style={{ color: "#9CA3AF" }} />
                      <span className="text-xs" style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {w.checkIn}
                      </span>
                    </div>
                  )}
                </div>

                {/* Right side */}
                {isPending ? (
                  <div className="flex flex-col items-end gap-1.5">
                    <span
                      className="text-xs"
                      style={{ color: "#DC2626", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
                    >
                      Not Marked
                    </span>
                    <button
                      onClick={() => navigate("/camera")}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs"
                      style={{
                        background: "linear-gradient(135deg, #7AB418, #5E8C12)",
                        color: "white",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      <Camera size={11} />
                      Mark Now
                    </button>
                  </div>
                ) : (
                  <span
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{ background: s!.bg, color: s!.color, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
                  >
                    {w.status}
                  </span>
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
