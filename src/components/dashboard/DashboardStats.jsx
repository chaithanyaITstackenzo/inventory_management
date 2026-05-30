import { C } from "../../utils/constants";
import StatCard from "./StatCard";

export default function DashboardStats({ totalRevenue, totalProducts, activeOrdersCount, lowStockCount }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
      <StatCard label="Total Revenue" value={totalRevenue} prefix="₹" delta="+18.4%" icon="💰" color={C.primary} />
      <StatCard label="Total Products" value={totalProducts} delta="+5 this month" icon="📦" color={C.accent} />
      <StatCard label="Active Orders" value={activeOrdersCount} delta="+2 today" icon="🛒" color={C.warning} />
      <StatCard label="Low Stock Alerts" value={lowStockCount} delta="needs attention" icon="⚠️" color={C.danger} />
    </div>
  );
}
