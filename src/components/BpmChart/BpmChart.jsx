import {
  ComposedChart, Bar, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";
import "./bpmchart.css";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="chart-tooltip">
        {payload.map((p) => (
          <div key={p.dataKey} className="tooltip-row">
            <span className="tooltip-dot" style={{ background: p.color }} />
            <span className="tooltip-key">
              {p.dataKey === "min" ? "Min" : p.dataKey === "max" ? "Max" : "Moy"}
            </span>
            <span className="tooltip-val">{p.value} bpm</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function BpmChart({ data = [], dateLabel = "" }) {
  const avgBpm = data.length
    ? Math.round(data.reduce((acc, d) => acc + d.avg, 0) / data.length)
    : 0;

  const domainMin = data.length ? Math.min(...data.map((d) => d.min)) - 10 : 120;
  const domainMax = data.length ? Math.max(...data.map((d) => d.max)) + 10 : 200;

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h2 className="chart-title bpm-title">{avgBpm} BPM</h2>
          <p className="chart-subtitle">Fréquence cardiaque moyenne</p>
        </div>
        <span className="chart-date">{dateLabel}</span>
      </div>

      <div className="chart-graph">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8eaf0" />
            <XAxis
              dataKey="day"
              tick={{ fill: "#9B9EAC", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[domainMin, domainMax]}
              tick={{ fill: "#9B9EAC", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,59,48,0.05)" }} />
            <Bar dataKey="min" fill="#F7A9A0" radius={[6, 6, 0, 0]} barSize={22} />
            <Bar dataKey="max" fill="#FF3B30" radius={[6, 6, 0, 0]} barSize={22} />
            <Line
              type="monotone"
              dataKey="avg"
              stroke="#3B5BDB"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#3B5BDB", strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="bpm-legend">
        {[
          { color: "#F7A9A0", label: "Min BPM" },
          { color: "#FF3B30", label: "Max BPM" },
          { color: "#3B5BDB", label: "Moy BPM" },
        ].map(({ color, label }) => (
          <span key={label} className="bpm-legend-item">
            <span className="dot" style={{ background: color }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}