import { C } from "../utils/constants";
import { useApp } from "../context/AppContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";

const REPORTS = [
  { title: "Inventory Summary Report", desc: "Complete stock levels, values, and movement", icon: "📦", type: "Inventory", date: "May 2025" },
  { title: "Monthly Sales Report", desc: "Revenue, orders, and performance metrics", icon: "📊", type: "Sales", date: "May 2025" },
  { title: "Purchase Orders Report", desc: "All procurement and supplier transactions", icon: "🛒", type: "Purchase", date: "May 2025" },
  { title: "Low Stock Alert Report", desc: "Items below minimum threshold", icon: "⚠️", type: "Alerts", date: "Live" },
  { title: "Supplier Performance Report", desc: "Ratings, delivery times, and quality scores", icon: "🤝", type: "Suppliers", date: "Q2 2025" },
  { title: "Profit & Loss Statement", desc: "Comprehensive P&L with cost analysis", icon: "💰", type: "Finance", date: "FY 2025" },
];

export default function Reports() {
  const { showToast } = useApp();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 16, color: C.text }}>Reports Center</div>
          <div style={{ fontSize: 13, color: C.textMuted }}>Generate, download, and schedule reports</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="ghost" size="sm">📅 Schedule Report</Button>
          <Button variant="primary" size="sm">+ Custom Report</Button>
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        {REPORTS.map((r) => (
          <Card key={r.title} style={{ padding: 22 }}>
            <div style={{ display: "flex", gap: 14, marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{r.icon}</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15, color: C.text }}>{r.title}</div>
                <Badge color="muted">{r.type}</Badge>
              </div>
            </div>
            <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 16, lineHeight: 1.6 }}>{r.desc}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
              <span style={{ fontSize: 12, color: C.textLight }}>Period: {r.date}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <Button size="sm" variant="ghost" onClick={() => showToast("success", "Report Generated", r.title + " ready")}>📄 PDF</Button>
                <Button size="sm" variant="outline" onClick={() => showToast("success", "Export Ready", r.title + " exported")}>📊 Excel</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
