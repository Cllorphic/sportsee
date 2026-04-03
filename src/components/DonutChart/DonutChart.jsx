import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "./donutchart.css";

const COLORS = ["#3B5BDB", "#C8CEED"];

export default function DonutChart({ done = 0, goal = 6 }) {
  const remaining = Math.max(goal - done, 0);
  const data = [
    { name: `${done} réalisées`, value: done },
    { name: `${remaining} restants`, value: remaining },
  ];

  return (
    <div className="donut-wrapper">
      <div className="donut-chart-area">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={65}
              outerRadius={90}
              paddingAngle={done === goal ? 0 : 3}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} strokeWidth={0} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="donut-legend">
        {data.map((entry, i) => (
          <li key={i} className="donut-legend-item">
            <span className="donut-legend-dot" style={{ background: COLORS[i] }} />
            {entry.name}
          </li>
        ))}
      </ul>
    </div>
  );
}