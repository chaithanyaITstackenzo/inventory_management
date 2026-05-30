import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { C } from "../../utils/constants";
import { formatNumber } from "../../utils/formatNumber";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function RevenueAreaChart({ data }) {
  return (
    <Card style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h3 style={{ margin: 0, fontWeight: 800, color: C.text, fontSize: 16 }}>Revenue vs Cost vs Profit</h3>
        <Badge color="primary">2025</Badge>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={C.primary} stopOpacity={0.2} />
              <stop offset="95%" stopColor={C.primary} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={C.success} stopOpacity={0.2} />
              <stop offset="95%" stopColor={C.success} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: C.textMuted }} />
          <YAxis tick={{ fontSize: 11, fill: C.textMuted }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
          <Tooltip formatter={(v) => `₹${formatNumber(v)}`} />
          <Area type="monotone" dataKey="revenue" stroke={C.primary} fill="url(#revGrad)" strokeWidth={2} name="Revenue" />
          <Area type="monotone" dataKey="profit" stroke={C.success} fill="url(#profGrad)" strokeWidth={2} name="Profit" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
