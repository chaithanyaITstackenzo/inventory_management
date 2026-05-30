import { useState } from "react";
import { C } from "../utils/constants";
import { useApp } from "../context/AppContext";
import { ORDERS } from "../data/orders";
import { formatCurrency } from "../utils/formatCurrency";
import StatCard from "../components/dashboard/StatCard";
import Card from "../components/ui/Card";
import Table from "../components/ui/Table";
import Button from "../components/ui/Button";
import SearchBar from "../components/ui/SearchBar";
import Select from "../components/ui/Select";
import Badge from "../components/ui/Badge";
import StatusBadge from "../components/ui/StatusBadge";
import Modal from "../components/ui/Modal";

export default function Orders() {
  const { showToast } = useApp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [orderDetail, setOrderDetail] = useState(null);

  const statuses = ["All", "Delivered", "Shipped", "Processing", "Pending", "Cancelled"];
  const filtered = ORDERS.filter((o) => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12 }}>
        {[
          { label: "Total Orders", value: ORDERS.length, icon: "📋", color: C.primary },
          { label: "Delivered", value: ORDERS.filter((o) => o.status === "Delivered").length, icon: "✅", color: C.success },
          { label: "Shipped", value: ORDERS.filter((o) => o.status === "Shipped").length, icon: "🚚", color: C.accent },
          { label: "Pending", value: ORDERS.filter((o) => o.status === "Pending" || o.status === "Processing").length, icon: "⏳", color: C.warning },
          { label: "Cancelled", value: ORDERS.filter((o) => o.status === "Cancelled").length, icon: "❌", color: C.danger },
        ].map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <Card>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 240 }}><SearchBar placeholder="Search orders..." value={search} onChange={setSearch} /></div>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              {statuses.map((s) => <option key={s}>{s}</option>)}
            </Select>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Button size="sm" variant="ghost">📤 Export</Button>
            <Button size="sm" variant="primary">+ New Order</Button>
          </div>
        </div>
        <Table
          columns={[
            { key: "id", label: "Order ID", render: (v) => <span style={{ fontWeight: 800, color: C.primary, fontFamily: "monospace" }}>{v}</span> },
            { key: "customer", label: "Customer", render: (v) => <b>{v}</b> },
            { key: "date", label: "Date" },
            { key: "items", label: "Items", render: (v) => <Badge color="muted">{v} items</Badge> },
            { key: "total", label: "Amount", render: (v) => <span style={{ fontWeight: 800, color: C.text }}>{formatCurrency(v)}</span> },
            { key: "status", label: "Status", render: (v) => <StatusBadge status={v} /> },
            { key: "payment", label: "Payment", render: (v) => <StatusBadge status={v} /> },
            { key: "id", label: "Actions", render: (v, row) => (
              <div style={{ display: "flex", gap: 6 }}>
                <Button size="sm" variant="ghost" onClick={() => setOrderDetail(row)}>👁️</Button>
                <Button size="sm" variant="ghost" onClick={() => showToast("success", "Invoice Downloaded", `Invoice for ${row.id}`)}>🧾</Button>
              </div>
            )},
          ]}
          data={filtered}
        />
      </Card>

      <Modal open={!!orderDetail} onClose={() => setOrderDetail(null)} title={`Order Details — ${orderDetail?.id}`} width={600}>
        {orderDetail && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { label: "Customer", value: orderDetail.customer },
                { label: "Order Date", value: orderDetail.date },
                { label: "Tracking No.", value: orderDetail.tracking },
                { label: "Total Amount", value: formatCurrency(orderDetail.total) },
              ].map((f) => (
                <div key={f.label} style={{ padding: "12px 14px", background: "#F8FAFC", borderRadius: 9, border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", marginBottom: 4 }}>{f.label}</div>
                  <div style={{ fontWeight: 800, color: C.text }}>{f.value}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.textMuted }}>Order Status:</span>
              <StatusBadge status={orderDetail.status} />
              <span style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, marginLeft: 12 }}>Payment:</span>
              <StatusBadge status={orderDetail.payment} />
            </div>
            <div style={{ background: "#F8FAFC", borderRadius: 10, padding: 16, border: `1px solid ${C.border}` }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: C.text, marginBottom: 12 }}>Shipment Timeline</div>
              {["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"].map((step, i) => {
                const stepIndex = ["Pending", "Processing", "Shipped", "Shipped", "Delivered"].indexOf(orderDetail.status);
                const done = i <= stepIndex;
                return (
                  <div key={step} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: done ? C.success : C.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: done ? "#fff" : C.textMuted, flexShrink: 0 }}>
                      {done ? "✓" : i + 1}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: done ? 700 : 400, color: done ? C.text : C.textMuted }}>{step}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <Button variant="ghost" onClick={() => showToast("success", "Invoice Downloaded", `Invoice for ${orderDetail.id}`)}>📄 Download Invoice</Button>
              <Button variant="primary" onClick={() => setOrderDetail(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
