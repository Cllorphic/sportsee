import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";
import "./ActivityChart.css";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="chart-tooltip">
        <span className="tooltip-label">{label}</span>
        <span className="tooltip-value">{payload[0].value} km</span>
      </div>
    );
  }
  return null;
};

// Valeurs par défaut → le composant ne crashe pas si le parent oublie les props
export default function ActivityChart({ data = [], dateLabel = "" }) {
  const avgKm = data.length
    ? Math.round(data.reduce((acc, d) => acc + d.km, 0) / data.length)
    : 0;

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h2 className="chart-title activity-title">{avgKm}km en moyenne</h2>
          <p className="chart-subtitle">Total des kilomètres 4 dernières semaines</p>
        </div>
        {/* dateLabel est désormais RENDU ici → warning "assigned but never used" résolu */}
        <span className="chart-date">{dateLabel}</span>
      </div>

      <div className="chart-graph">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8eaf0" />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#9B9EAC", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#9B9EAC", fontSize: 12 }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(163,168,225,0.1)" }}
            />
            <Bar dataKey="km" fill="#A4A8E1" radius={[8, 8, 0, 0]} barSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-legend">
        <span className="dot" style={{ background: "#A4A8E1" }} />
        Km
      </div>
    </div>
  );
}