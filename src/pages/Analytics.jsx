import { useMemo } from "react";
import { useAnalytics } from "../hooks/useAnalytics";
import { C } from "../utils/constants";
import { formatCurrency } from "../utils/formatCurrency";
import StatCard from "../components/dashboard/StatCard";
import SalesBarChart from "../components/charts/SalesBarChart";
import StockTrendChart from "../components/charts/StockTrendChart";
import Card from "../components/ui/Card";

export default function Analytics() {
  const { revenueData, stockTrend, topProducts, totalRevenue, totalOrders, avgOrderValue, loading } = useAnalytics();
  const COLORS = [C.primary, C.success, C.warning, C.accent, C.danger];

  const totalProfit = useMemo(() => {
    return revenueData.reduce((sum, item) => sum + (item.profit || 0), 0);
  }, [revenueData]);

  const topProductsList = topProducts || [];
  const maxValue = Math.max(...topProductsList.map((item) => item.value), 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        <StatCard label="Annual Revenue" value={totalRevenue} prefix="₹" delta="Live" icon="💰" color={C.primary} />
        <StatCard label="Total Profit" value={totalProfit} prefix="₹" delta="Live" icon="📈" color={C.success} />
        <StatCard label="Orders" value={totalOrders} delta="Live" icon="📦" color={C.accent} />
        <StatCard label="Avg Order Value" value={avgOrderValue} prefix="₹" delta="Live" icon="🛒" color={C.warning} />
      </div>

      <SalesBarChart data={loading ? [] : revenueData} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <StockTrendChart data={loading ? [] : stockTrend} />

        <Card style={{ padding: 24 }}>
          <h3 style={{ margin: "0 0 20px", fontWeight: 800, color: C.text, fontSize: 16 }}>Top Inventory Products</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {loading ? (
              <div style={{ color: C.textMuted }}>Loading top products...</div>
            ) : topProductsList.length === 0 ? (
              <div style={{ color: C.textMuted }}>No products available.</div>
            ) : (
              topProductsList.map((p, i) => {
                const pct = Math.max(10, Math.round((p.value / maxValue) * 100));
                return (
                  <div key={`${p.sku}-${i}`} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: COLORS[i] || C.border, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 11 }}>
                      {i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 4 }}>{p.name}</div>
                      <div style={{ height: 6, background: C.border, borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: COLORS[i] || C.primary, borderRadius: 3, transition: "width 0.5s ease" }} />
                      </div>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.text, minWidth: 90, textAlign: "right" }}>
                      {formatCurrency(p.value)}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
