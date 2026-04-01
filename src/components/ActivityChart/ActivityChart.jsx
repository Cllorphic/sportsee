import { weeklyData } from "../../mocks/data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ActivityChart() {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h2>18km en moyenne</h2>
        <span>28 mai - 25 juin</span>
      </div>

      <p className="chart-subtitle">
        Total des kilomètres 4 dernières semaines
      </p>

      {/* LE GRAPH */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={weeklyData}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="km" fill="#A4A8E1" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* LÉGENDE */}
      <div className="chart-legend">
        <span className="dot"></span> Km
      </div>
    </div>
  );
}