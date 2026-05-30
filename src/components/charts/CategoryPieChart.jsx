import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { C } from "../../utils/constants";
import Card from "../ui/Card";

export default function CategoryPieChart({ data }) {
  return (
    <Card style={{ padding: 24 }}>
      <h3 style={{ margin: "0 0 20px", fontWeight: 800, color: C.text, fontSize: 16 }}>Category Distribution</h3>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => `${v}%`} />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
        {data.map((cat) => (
          <div key={cat.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: cat.color }} />
              <span style={{ color: C.textMuted }}>{cat.name}</span>
            </div>
            <span style={{ fontWeight: 700, color: C.text }}>{cat.value}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
