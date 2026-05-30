import { C } from "../../utils/constants";
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function LowStockAlerts({ items, onViewAll }) {
  return (
    <Card style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontWeight: 800, color: C.text, fontSize: 16 }}>⚠️ Low Stock Alerts</h3>
        <Button size="sm" variant="outline" onClick={onViewAll}>View All</Button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((p) => (
          <div
            key={p.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 12px",
              background: p.qty === 0 ? C.dangerLight : C.warningLight,
              borderRadius: 9,
              border: `1px solid ${p.qty === 0 ? "#FCA5A5" : "#FDE68A"}`,
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: C.text }}>{p.name}</div>
              <div style={{ fontSize: 12, color: C.textMuted }}>SKU: {p.sku}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 800, fontSize: 18, color: p.qty === 0 ? C.danger : C.warning }}>{p.qty}</div>
              <div style={{ fontSize: 11, color: C.textMuted }}>min: {p.minQty}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
