import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ChevronLeft, Download, Share2, FileText } from "lucide-react";
import { WORKERS, TOTAL, PRESENT, ABSENT } from "../data/workers";
import { getUser, wardLabel } from "../utils/auth";

const STATUS_CONFIG: Record<string, { bg: string; color: string }> = {
  Present:     { bg: "rgba(34,197,94,0.1)",  color: "#16A34A" },
  Absent:      { bg: "rgba(239,68,68,0.1)",  color: "#DC2626" },
  "Not Taken": { bg: "rgba(245,158,11,0.1)", color: "#D97706" },
  "Half Day":  { bg: "rgba(122,180,24,0.1)", color: "#5E8C12" },
};

const SELECTED_DATE = "2026-03-14";
const DISPLAY_DATE  = "14/03/2026";

export default function PDFPreviewScreen() {
  const navigate = useNavigate();

  const user = getUser();
  const supervisorName = user?.supervisor || "Animator";
  const empId = user?.empId || "—";
  const municipality = user ? wardLabel(user.username) : "Puducherry";

  const halfDay = WORKERS.filter(w => w.status === "Half Day").length;

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#F8FAFC" }}>
      {/* Header */}
      <div
        className="flex-shrink-0 px-5 pt-12 pb-5"
        style={{ background: "linear-gradient(135deg, #1A2E07, #2A4710)" }}
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <ChevronLeft size={20} color="white" />
            </button>
            <div>
              <h2
                className="text-xl"
                style={{ color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
              >
                PDF Preview
              </h2>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Daily Attendance Report
              </p>
            </div>
          </div>
          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(122,180,24,0.2)", border: "1px solid rgba(122,180,24,0.3)" }}
          >
            <Share2 size={16} style={{ color: "#8FCC20" }} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        {/* Summary row */}
        <div className="px-5 mt-4">
          <div className="flex gap-2">
            {[
              { label: "Total",    value: TOTAL,   color: "#2A4710", bg: "rgba(42,71,16,0.08)" },
              { label: "Present",  value: PRESENT, color: "#16A34A", bg: "rgba(34,197,94,0.08)" },
              { label: "Absent",   value: ABSENT,  color: "#DC2626", bg: "rgba(239,68,68,0.08)" },
              { label: "Half Day", value: halfDay, color: "#5E8C12", bg: "rgba(122,180,24,0.08)" },
            ].map(s => (
              <div
                key={s.label}
                className="flex-1 rounded-xl p-2.5 flex flex-col items-center gap-0.5"
                style={{ background: s.bg }}
              >
                <span
                  className="text-lg"
                  style={{ color: s.color, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, lineHeight: 1 }}
                >
                  {s.value}
                </span>
                <span
                  className="text-center"
                  style={{ color: s.color, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 9, opacity: 0.7 }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Report Table */}
        <div className="px-5 mt-4">
          <p
            className="text-xs mb-3"
            style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}
          >
            Worker Records · {WORKERS.length} entries
          </p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl overflow-hidden"
            style={{ background: "white", boxShadow: "0 2px 10px rgba(26,46,7,0.08)" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 560 }}>
                {/* Header */}
                <thead>
                  <tr style={{ background: "#1A2E07" }}>
                    {["SI.NO", "DATE", "EMP ID", "NAME", "CONSTITUENCY", "WARD", "STATUS", "PHOTO"].map((col) => (
                      <th
                        key={col}
                        className="px-2 py-2.5 text-center"
                        style={{
                          color: "white",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 700,
                          fontSize: 9,
                          letterSpacing: "0.06em",
                          borderRight: "1px solid rgba(255,255,255,0.12)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Body */}
                <tbody>
                  {WORKERS.map((w, i) => {
                    const s = STATUS_CONFIG[w.status];
                    const isEven = i % 2 === 0;
                    return (
                      <tr
                        key={w.id}
                        style={{ background: isEven ? "white" : "#F9FAFB", borderBottom: "1px solid #F3F4F6" }}
                      >
                        {/* SI.NO */}
                        <td className="px-2 py-2 text-center" style={{ borderRight: "1px solid #F3F4F6", minWidth: 36 }}>
                          <span style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10, fontWeight: 600 }}>
                            {i + 1}
                          </span>
                        </td>

                        {/* DATE */}
                        <td className="px-2 py-2 text-center" style={{ borderRight: "1px solid #F3F4F6", minWidth: 72 }}>
                          <span style={{ color: "#374151", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 9, fontWeight: 500 }}>
                            {DISPLAY_DATE}
                          </span>
                        </td>

                        {/* EMP ID */}
                        <td className="px-2 py-2 text-center" style={{ borderRight: "1px solid #F3F4F6", minWidth: 72 }}>
                          <span style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 9, fontWeight: 700 }}>
                            {w.id}
                          </span>
                        </td>

                        {/* NAME */}
                        <td className="px-2 py-2" style={{ borderRight: "1px solid #F3F4F6", minWidth: 90 }}>
                          <span style={{ color: "#111827", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 9, fontWeight: 600 }}>
                            {w.name.toUpperCase()}
                          </span>
                        </td>

                        {/* CONSTITUENCY */}
                        <td className="px-2 py-2 text-center" style={{ borderRight: "1px solid #F3F4F6", minWidth: 70 }}>
                          <span style={{ color: "#374151", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 9, fontWeight: 500 }}>
                            {w.zone}
                          </span>
                        </td>

                        {/* WARD */}
                        <td className="px-2 py-2 text-center" style={{ borderRight: "1px solid #F3F4F6", minWidth: 60 }}>
                          <span style={{ color: "#374151", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 9, fontWeight: 500 }}>
                            {w.ward}
                          </span>
                        </td>

                        {/* STATUS */}
                        <td className="px-2 py-2 text-center" style={{ borderRight: "1px solid #F3F4F6", minWidth: 64 }}>
                          <span
                            style={{
                              color: s.color,
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              fontSize: 9,
                              fontWeight: 700,
                              letterSpacing: "0.04em",
                            }}
                          >
                            {w.status.toUpperCase()}
                          </span>
                        </td>

                        {/* PHOTO */}
                        <td className="px-2 py-2 text-center" style={{ minWidth: 44 }}>
                          {w.photo ? (
                            <img
                              src={w.photo}
                              alt={w.name}
                              className="w-7 h-7 rounded-full object-cover mx-auto"
                              style={{ border: "1.5px solid #E5E7EB" }}
                            />
                          ) : (
                            <div
                              className="w-7 h-7 rounded-full flex items-center justify-center mx-auto"
                              style={{ background: `${w.color}22` }}
                            >
                              <span style={{ color: w.color, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 8, fontWeight: 700 }}>
                                {w.initials}
                              </span>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Export buttons */}
        <div className="px-5 mt-5 flex flex-col gap-3">
          <button
            className="w-full py-4 rounded-xl flex items-center justify-center gap-2 text-sm active:scale-95 transition-transform"
            style={{
              background: "linear-gradient(135deg, #1A2E07, #2A4710)",
              color: "white",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              boxShadow: "0 4px 16px rgba(26,46,7,0.2)",
            }}
          >
            <Download size={16} />
            📄 Download PDF
          </button>
          <button
            className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm"
            style={{
              background: "white",
              border: "1.5px solid rgba(122,180,24,0.3)",
              color: "#7AB418",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
            }}
          >
            <Share2 size={16} />
            Share Report
          </button>
        </div>
      </div>
    </div>
  );
}