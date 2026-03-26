import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FileText, Download, ChevronDown, Calendar } from "lucide-react";
import { WORKERS, TOTAL, PRESENT, ABSENT } from "../data/workers";

const STATUS_CONFIG: Record<string, { bg: string; color: string }> = {
  Present:     { bg: "rgba(34,197,94,0.1)",  color: "#16A34A" },
  Absent:      { bg: "rgba(239,68,68,0.1)",  color: "#DC2626" },
  "Not Taken": { bg: "rgba(245,158,11,0.1)", color: "#D97706" },
  "Half Day":  { bg: "rgba(122,180,24,0.1)", color: "#5E8C12" },
};

const ZONES = ["All Zones", "Zone 2", "Zone 3", "Zone 4"];

export default function ReportScreen() {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState("01/03/2026");
  const [toDate, setToDate] = useState("14/03/2026");
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [showZoneDrop, setShowZoneDrop] = useState(false);

  const filtered = WORKERS.filter(w => selectedZone === "All Zones" || w.zone === selectedZone);
  const halfDay = filtered.filter(w => w.status === "Half Day").length;

  const today = new Date();
  const todayStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

  // Helper to convert dd/mm/yyyy to Date object for comparison
  const parseDate = (dateStr: string): Date | null => {
    if (!dateStr || !dateStr.match(/^\d{2}\/\d{2}\/\d{4}$/)) return null;
    const [day, month, year] = dateStr.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  // Helper to validate and format date input
  const formatDateInput = (value: string): string => {
    // Remove non-numeric and non-slash characters
    let cleaned = value.replace(/[^\d\/]/g, '');
    
    // Auto-add slashes
    if (cleaned.length >= 2 && cleaned[2] !== '/') {
      cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    if (cleaned.length >= 5 && cleaned[5] !== '/') {
      cleaned = cleaned.slice(0, 5) + '/' + cleaned.slice(5);
    }
    
    // Limit to 10 characters (dd/mm/yyyy)
    return cleaned.slice(0, 10);
  };

  const dateInputStyle = (val: string) => ({
    background: val ? "rgba(122,180,24,0.04)" : "white",
    border: val ? "1.5px solid #7AB418" : "1.5px solid #E5E7EB",
    color: "#1A2E07",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 600,
    boxShadow: val ? "0 0 0 3px rgba(122,180,24,0.1)" : "none",
    colorScheme: "light" as const,
  });

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#F8FAFC" }}>
      {/* Header */}
      <div
        className="flex-shrink-0 px-5 pt-12 pb-5"
        style={{ background: "linear-gradient(135deg, #1A2E07, #2A4710)" }}
      >
        <div className="flex items-center justify-between mb-1">
          <h2
            className="text-xl"
            style={{ color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
          >
            Attendance Report
          </h2>
          <button
            onClick={() => navigate("/pdf-preview")}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(122,180,24,0.2)", border: "1px solid rgba(122,180,24,0.3)" }}
          >
            <Download size={16} style={{ color: "#8FCC20" }} />
          </button>
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Puducherry Municipal Zone 4
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Date Range + Zone Filters */}
        <div className="px-5 pt-4">
          {/* Date Range Row */}
          <div
            className="rounded-2xl p-3 mb-3"
            style={{ background: "white", boxShadow: "0 1px 6px rgba(26,46,7,0.07)", border: "1px solid #F3F4F6" }}
          >
            <div className="flex items-center gap-2 mb-2.5">
              <Calendar size={13} style={{ color: "#7AB418" }} />
              <span style={{ color: "#374151", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em" }}>
                DATE RANGE
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* From */}
              <div className="flex-1">
                <label
                  className="text-xs mb-1 block"
                  style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 10 }}
                >
                  FROM
                </label>
                <input
                  type="text"
                  value={fromDate}
                  onChange={e => {
                    const formatted = formatDateInput(e.target.value);
                    setFromDate(formatted);
                    const fromDateObj = parseDate(formatted);
                    const toDateObj = parseDate(toDate);
                    if (toDate && fromDateObj && toDateObj && fromDateObj > toDateObj) {
                      setToDate(formatted);
                    }
                  }}
                  placeholder="DD/MM/YYYY"
                  className="w-full px-2.5 py-2 rounded-xl outline-none text-xs transition-all duration-150"
                  style={dateInputStyle(fromDate)}
                />
              </div>

              {/* Arrow */}
              <div className="flex items-end pb-1.5">
                <div
                  className="px-2 py-1 rounded-lg"
                  style={{ background: "rgba(122,180,24,0.1)" }}
                >
                  <span style={{ color: "#7AB418", fontSize: 12, fontWeight: 700 }}>→</span>
                </div>
              </div>

              {/* To */}
              <div className="flex-1">
                <label
                  className="text-xs mb-1 block"
                  style={{ color: "#9CA3AF", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 10 }}
                >
                  TO
                </label>
                <input
                  type="text"
                  value={toDate}
                  onChange={e => {
                    const formatted = formatDateInput(e.target.value);
                    setToDate(formatted);
                    const fromDateObj = parseDate(fromDate);
                    const toDateObj = parseDate(formatted);
                    if (fromDate && fromDateObj && toDateObj && toDateObj < fromDateObj) {
                      setFromDate(formatted);
                    }
                  }}
                  placeholder="DD/MM/YYYY"
                  className="w-full px-2.5 py-2 rounded-xl outline-none text-xs transition-all duration-150"
                  style={dateInputStyle(toDate)}
                />
              </div>
            </div>

            {/* Range label */}
            {fromDate && toDate && (
              <div
                className="mt-2.5 px-3 py-1.5 rounded-xl flex items-center justify-center gap-1"
                style={{ background: "rgba(122,180,24,0.06)", border: "1px dashed rgba(122,180,24,0.25)" }}
              >
                <span style={{ color: "#5E8C12", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10, fontWeight: 600 }}>
                  {fromDate} &nbsp;–&nbsp; {toDate}
                </span>
              </div>
            )}
          </div>

          {/* Zone dropdown */}
          <div className="relative">
            <label className="text-xs mb-1 block" style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
              Ward Wise
            </label>
            <button
              onClick={() => setShowZoneDrop(!showZoneDrop)}
              className="w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-xs"
              style={{
                background: "white",
                border: "1.5px solid #E5E7EB",
                color: "#1A2E07",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
              }}
            >
              {selectedZone}
              <ChevronDown size={14} style={{ color: "#9CA3AF", transform: showZoneDrop ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </button>
            {showZoneDrop && (
              <div
                className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden z-10"
                style={{ background: "white", boxShadow: "0 8px 24px rgba(26,46,7,0.15)", border: "1px solid #E5E7EB" }}
              >
                {ZONES.map(z => (
                  <button
                    key={z}
                    className="w-full px-3 py-2.5 text-left text-xs"
                    style={{
                      color: selectedZone === z ? "#7AB418" : "#1A2E07",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: selectedZone === z ? 700 : 500,
                      background: selectedZone === z ? "rgba(122,180,24,0.05)" : "white",
                    }}
                    onClick={() => { setSelectedZone(z); setShowZoneDrop(false); }}
                  >
                    {z}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

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
            Worker Records · {filtered.length} entries
          </p>

          <div className="rounded-2xl overflow-hidden" style={{ background: "white", boxShadow: "0 2px 10px rgba(26,46,7,0.08)" }}>
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
                  {filtered.map((w, i) => {
                    const s = STATUS_CONFIG[w.status];
                    const isEven = i % 2 === 0;
                    return (
                      <tr
                        key={w.id}
                        style={{ background: isEven ? "white" : "#F9FAFB", borderBottom: "1px solid #F3F4F6" }}
                      >
                        <td className="px-2 py-2 text-center" style={{ borderRight: "1px solid #F3F4F6", minWidth: 36 }}>
                          <span style={{ color: "#6B7280", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 10, fontWeight: 600 }}>
                            {i + 1}
                          </span>
                        </td>
                        <td className="px-2 py-2 text-center" style={{ borderRight: "1px solid #F3F4F6", minWidth: 72 }}>
                          <span style={{ color: "#374151", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 9, fontWeight: 500 }}>
                            {fromDate.split("-").reverse().join("/")}
                          </span>
                        </td>
                        <td className="px-2 py-2 text-center" style={{ borderRight: "1px solid #F3F4F6", minWidth: 72 }}>
                          <span style={{ color: "#1A2E07", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 9, fontWeight: 700 }}>
                            {w.id}
                          </span>
                        </td>
                        <td className="px-2 py-2" style={{ borderRight: "1px solid #F3F4F6", minWidth: 90 }}>
                          <span style={{ color: "#111827", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 9, fontWeight: 600 }}>
                            {w.name.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-2 py-2 text-center" style={{ borderRight: "1px solid #F3F4F6", minWidth: 70 }}>
                          <span style={{ color: "#374151", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 9, fontWeight: 500 }}>
                            {w.zone}
                          </span>
                        </td>
                        <td className="px-2 py-2 text-center" style={{ borderRight: "1px solid #F3F4F6", minWidth: 60 }}>
                          <span style={{ color: "#374151", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 9, fontWeight: 500 }}>
                            {w.ward}
                          </span>
                        </td>
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
          </div>
        </div>

        {/* Export buttons */}
        <div className="px-5 mt-5 flex flex-col gap-3">
          <button
            onClick={() => navigate("/pdf-preview")}
            className="w-full py-4 rounded-xl flex items-center justify-center gap-2 text-sm active:scale-95 transition-transform"
            style={{
              background: "linear-gradient(135deg, #1A2E07, #2A4710)",
              color: "white",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              boxShadow: "0 4px 16px rgba(26,46,7,0.2)",
            }}
          >
            <FileText size={16} />
            📄 Export as PDF
          </button>
          <button
            className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm"
            style={{
              background: "white",
              border: "1.5px solid #E5E7EB",
              color: "#1A2E07",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
            }}
          >
            📊 Export as Excel
          </button>
        </div>
      </div>
    </div>
  );
}