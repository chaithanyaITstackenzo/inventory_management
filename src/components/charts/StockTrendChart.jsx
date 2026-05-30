import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { C } from "../../utils/constants";
import Card from "../ui/Card";

export default function StockTrendChart({ data }) {
  return (
    <Card style={{ padding: 24 }}>
      <h3 style={{ margin: "0 0 20px", fontWeight: 800, color: C.text, fontSize: 16 }}>Stock Flow Trends</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
          <XAxis dataKey="week" tick={{ fontSize: 12, fill: C.textMuted }} />
          <YAxis tick={{ fontSize: 11, fill: C.textMuted }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="inflow" stroke={C.success} strokeWidth={2.5} dot={{ r: 4 }} name="Stock In" />
          <Line type="monotone" dataKey="outflow" stroke={C.danger} strokeWidth={2.5} dot={{ r: 4 }} name="Stock Out" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
