import { useState } from "react";
import { C } from "../utils/constants";
import { useApp } from "../context/AppContext";
import { useInventory } from "../hooks/useInventory";
import { formatCurrency } from "../utils/formatCurrency";
import Card from "../components/ui/Card";
import Table from "../components/ui/Table";
import Button from "../components/ui/Button";
import SearchBar from "../components/ui/SearchBar";
import Badge from "../components/ui/Badge";
import StatusBadge from "../components/ui/StatusBadge";
import Modal from "../components/ui/Modal";
import ProductForm from "../components/forms/ProductForm";

function ProductDetail({ product, onBack, showToast }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button variant="ghost" onClick={onBack}>← Back</Button>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: C.text }}>{product.name}</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20 }}>
        <Card style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ width: 180, height: 180, borderRadius: 16, background: `linear-gradient(135deg, ${C.primaryLight}, ${C.accentLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72 }}>📦</div>
          <StatusBadge status={product.status} />
          <div style={{ width: "100%", textAlign: "left" }}>
            <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 4 }}>BARCODE</div>
            <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 700, color: C.text, background: "#F1F5F9", padding: "8px 12px", borderRadius: 8 }}>||| {product.barcode} |||</div>
          </div>
        </Card>
        <Card style={{ padding: 28 }}>
          <h3 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 800, color: C.text }}>{product.name}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { label: "SKU", value: product.sku },
              { label: "Category", value: product.category },
              { label: "Current Stock", value: `${product.qty} units` },
              { label: "Minimum Stock", value: `${product.minQty} units` },
              { label: "Selling Price", value: formatCurrency(product.price) },
              { label: "Cost Price", value: formatCurrency(product.cost) },
              { label: "Margin", value: `${(((product.price - product.cost) / product.price) * 100).toFixed(1)}%` },
              { label: "Supplier", value: product.supplier },
            ].map((f) => (
              <div key={f.label} style={{ padding: "14px 16px", background: "#F8FAFC", borderRadius: 10, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{f.label}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: C.text }}>{f.value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <Button variant="primary" onClick={() => showToast("success", "Product Updated", "Changes saved successfully")}>Edit Product</Button>
            <Button variant="ghost">📤 Export</Button>
            <Button variant="danger" onClick={() => { showToast("danger", "Product Deleted", product.name + " removed"); onBack(); }}>Delete</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function Products() {
  const { showToast } = useApp();
  const { search, setSearch, filtered, addProduct, loading } = useInventory();
  const [view, setView] = useState("grid");
  const [modal, setModal] = useState(false);
  const [detail, setDetail] = useState(null);

  const getErrorMessage = (err) => {
    if (err?.errors?.length) return err.errors.map((e) => e.msg).join(", ");
    return err?.message || "Save failed";
  };

  const handleAddProduct = async (payload) => {
    try {
      await addProduct(payload);
      showToast("success", "Product Added", "New product created successfully");
      setModal(false);
    } catch (err) {
      showToast("danger", "Save Failed", getErrorMessage(err));
    }
  };

  if (detail) {
    return <ProductDetail product={detail} onBack={() => setDetail(null)} showToast={showToast} />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 10, flex: 1 }}>
            <div style={{ width: 260 }}>
              <SearchBar placeholder="Search products..." value={search} onChange={setSearch} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setView("grid")} style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${C.border}`, background: view === "grid" ? C.primary : "transparent", color: view === "grid" ? "#fff" : C.textMuted, cursor: "pointer", fontSize: 16 }}>⊞</button>
            <button onClick={() => setView("list")} style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${C.border}`, background: view === "list" ? C.primary : "transparent", color: view === "list" ? "#fff" : C.textMuted, cursor: "pointer", fontSize: 16 }}>☰</button>
            <Button size="sm" variant="primary" onClick={() => setModal(true)}>+ Add Product</Button>
          </div>
        </div>
      </Card>

      {view === "grid" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {filtered.map((p) => (
            <Card
              key={p.id}
              style={{ padding: 20, cursor: "pointer", transition: "all 0.2s" }}
              onClick={() => setDetail(p)}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,99,235,0.12)"; e.currentTarget.style.borderColor = C.primary + "55"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = C.border; }}
            >
              <div style={{ height: 110, background: `linear-gradient(135deg, ${C.primaryLight}80, ${C.accentLight}80)`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, marginBottom: 14 }}>📦</div>
              <div style={{ fontWeight: 800, fontSize: 14, color: C.text, marginBottom: 4, lineHeight: 1.3 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 8 }}>{p.sku}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontWeight: 800, color: C.primary, fontSize: 16 }}>{formatCurrency(p.price)}</span>
                <span style={{ fontSize: 13, color: C.textMuted }}>Qty: <b style={{ color: p.qty === 0 ? C.danger : p.qty <= p.minQty ? C.warning : C.text }}>{p.qty}</b></span>
              </div>
              <StatusBadge status={p.status} />
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <Table
            columns={[
              { key: "name", label: "Product", render: (v, row) => <div><div style={{ fontWeight: 700 }}>{v}</div><div style={{ fontSize: 12, color: C.textMuted }}>{row.sku}</div></div> },
              { key: "category", label: "Category", render: (v) => <Badge color="primary">{v}</Badge> },
              { key: "qty", label: "Stock", render: (v, row) => <span style={{ fontWeight: 800, color: v === 0 ? C.danger : v <= row.minQty ? C.warning : C.success }}>{v}</span> },
              { key: "price", label: "Price", render: (v) => <b>{formatCurrency(v)}</b> },
              { key: "status", label: "Status", render: (v) => <StatusBadge status={v} /> },
            ]}
            data={filtered}
            onRowClick={setDetail}
          />
        </Card>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title="Add New Product">
        <ProductForm
          onCancel={() => setModal(false)}
          onSubmit={handleAddProduct}
        />
      </Modal>
      {loading && <div style={{ color: C.textMuted }}>Loading products...</div>}
    </div>
  );
}
