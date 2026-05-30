import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { C } from "../../utils/constants";
import { formatCurrency } from "../../utils/formatCurrency";
import Card from "../ui/Card";

export default function SalesBarChart({ data }) {
  return (
    <Card style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h3 style={{ margin: 0, fontWeight: 800, color: C.text, fontSize: 17 }}>Monthly Revenue Overview</h3>
        <div style={{ display: "flex", gap: 8 }}>
          {["3M", "6M", "1Y"].map((t) => (
            <button
              key={t}
              style={{
                padding: "5px 12px",
                borderRadius: 6,
                border: `1px solid ${C.border}`,
                background: t === "1Y" ? C.primary : "transparent",
                color: t === "1Y" ? "#fff" : C.textMuted,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "inherit",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: C.textMuted }} />
          <YAxis tick={{ fontSize: 11, fill: C.textMuted }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
          <Tooltip formatter={(v) => formatCurrency(v)} />
          <Legend />
          <Bar dataKey="revenue" fill={C.primary} radius={[4, 4, 0, 0]} name="Revenue" />
          <Bar dataKey="cost" fill={C.border} radius={[4, 4, 0, 0]} name="Cost" />
          <Bar dataKey="profit" fill={C.success} radius={[4, 4, 0, 0]} name="Profit" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
