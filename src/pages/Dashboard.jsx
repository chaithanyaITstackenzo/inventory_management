import { C } from "../utils/constants";
import { useApp } from "../context/AppContext";
import { useDashboard } from "../hooks/useDashboard";
import { formatCurrency } from "../utils/formatCurrency";
import DashboardStats from "../components/dashboard/DashboardStats";
import LowStockAlerts from "../components/dashboard/LowStockAlerts";
import RecentActivity from "../components/dashboard/RecentActivity";
import RevenueAreaChart from "../components/charts/RevenueAreaChart";
import CategoryPieChart from "../components/charts/CategoryPieChart";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Table from "../components/ui/Table";
import StatusBadge from "../components/ui/StatusBadge";

export default function Dashboard() {
  const { changePage } = useApp();
  const {
    lowStockItems,
    activeOrders,
    totalProducts,
    totalRevenue,
    revenueData,
    categoryData,
    loading,
  } = useDashboard();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <DashboardStats
        totalRevenue={totalRevenue}
        totalProducts={totalProducts}
        activeOrdersCount={activeOrders}
        lowStockCount={lowStockItems.length}
      />

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <RevenueAreaChart data={revenueData} />
        <CategoryPieChart data={categoryData} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <LowStockAlerts items={lowStockItems} onViewAll={() => changePage("inventory")} />
        <RecentActivity activities={[]} />
      </div>

      <Card style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontWeight: 800, color: C.text, fontSize: 16 }}>Recent Orders</h3>
          <Button size="sm" variant="outline" onClick={() => changePage("orders")}>View All Orders</Button>
        </div>
        <div style={{ padding: 24, color: C.textMuted }}>
          {loading ? "Loading recent order summary..." : "Recent orders are available in the Orders page."}
        </div>
      </Card>
    </div>
  );
}
