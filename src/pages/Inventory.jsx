import { useState } from "react";
import { C } from "../utils/constants";
import { useApp } from "../context/AppContext";
import { useInventory } from "../hooks/useInventory";
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
import InventoryForm from "../components/forms/InventoryForm";

export default function Inventory() {
  const { showToast } = useApp();
  const {
    search,
    setSearch,
    catFilter,
    setCatFilter,
    statusFilter,
    setStatusFilter,
    selected,
    setSelected,
    categories,
    statuses,
    filtered,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    bulkDeleteProducts,
    loading,
  } = useInventory();
  const [modal, setModal] = useState(null);

  const getErrorMessage = (err) => {
    if (err?.errors?.length) return err.errors.map((e) => e.msg).join(", ");
    return err?.message || "Save failed";
  };

  const handleSubmit = async (data) => {
    try {
      if (modal === "add") {
        await addProduct(data);
        showToast("success", "Item Added", "Inventory item added successfully");
      } else if (modal?.type === "edit") {
        await updateProduct(modal.item.id, data);
        showToast("success", "Item Updated", "Inventory item updated successfully");
      }
      setModal(null);
    } catch (err) {
      showToast("danger", "Save Failed", getErrorMessage(err));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        <StatCard label="Total SKUs" value={products.length} icon="📦" color={C.primary} />
        <StatCard label="In Stock" value={products.filter((p) => p.status === "In Stock").length} icon="✅" color={C.success} />
        <StatCard label="Low Stock" value={products.filter((p) => p.status === "Low Stock").length} icon="⚠️" color={C.warning} />
        <StatCard label="Out of Stock" value={products.filter((p) => p.status === "Out of Stock").length} icon="🚫" color={C.danger} />
      </div>

      <Card>
        <div style={{ padding: "18px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", flex: 1 }}>
            <div style={{ width: 260 }}>
              <SearchBar placeholder="Search products, SKU..." value={search} onChange={setSearch} />
            </div>
            <Select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </Select>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              {statuses.map((s) => <option key={s}>{s}</option>)}
            </Select>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {selected.length > 0 && (
              <Button size="sm" variant="danger" onClick={() => bulkDeleteProducts(selected)}>
                Delete ({selected.length})
              </Button>
            )}
            <Button size="sm" variant="ghost">📤 Export</Button>
            <Button size="sm" variant="primary" onClick={() => setModal("add")}>+ Add Item</Button>
          </div>
        </div>

        <Table
          columns={[
            { key: "id", label: "ID", render: (v) => <span style={{ color: C.textMuted, fontSize: 12, fontFamily: "monospace" }}>{v}</span> },
            { key: "name", label: "Product Name", render: (v, row) => (
              <div>
                <div style={{ fontWeight: 700, color: C.text }}>{v}</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>{row.sku}</div>
              </div>
            )},
            { key: "category", label: "Category", render: (v) => <Badge color="primary">{v}</Badge> },
            { key: "qty", label: "Quantity", render: (v, row) => (
              <div>
                <span style={{ fontWeight: 800, fontSize: 16, color: v === 0 ? C.danger : v <= row.minQty ? C.warning : C.text }}>{v}</span>
                <span style={{ fontSize: 12, color: C.textMuted }}> / min {row.minQty}</span>
              </div>
            )},
            { key: "price", label: "Sell Price", render: (v) => <span style={{ fontWeight: 700 }}>{formatCurrency(v)}</span> },
            { key: "supplier", label: "Supplier", render: (v) => <span style={{ fontSize: 13 }}>{v}</span> },
            { key: "status", label: "Status", render: (v) => <StatusBadge status={v} /> },
            { key: "id", label: "Actions", render: (v, row) => (
              <div style={{ display: "flex", gap: 6 }}>
                <Button size="sm" variant="ghost" onClick={() => setModal({ type: "edit", item: row })}>✏️</Button>
                <Button size="sm" variant="ghost" onClick={() => deleteProduct(v)}>🗑️</Button>
              </div>
            )},
          ]}
          data={filtered}
          loading={loading}
        />

        <div style={{ padding: "12px 20px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: C.textMuted }}>
          <span>Showing {filtered.length} of {products.length} items</span>
          <div style={{ display: "flex", gap: 6 }}>
            {[1, 2, 3].map((p) => (
              <button key={p} style={{ width: 32, height: 32, borderRadius: 6, border: `1px solid ${C.border}`, background: p === 1 ? C.primary : "transparent", color: p === 1 ? "#fff" : C.textMuted, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600 }}>{p}</button>
            ))}
          </div>
        </div>
      </Card>

      <Modal
        open={modal === "add" || (modal && modal.type === "edit")}
        onClose={() => setModal(null)}
        title={modal === "add" ? "Add Inventory Item" : "Edit Item"}
      >
        <InventoryForm
          item={modal?.item}
          isEdit={modal?.type === "edit"}
          onCancel={() => setModal(null)}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
}
