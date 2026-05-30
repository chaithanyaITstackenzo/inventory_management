import { useState } from "react";
import { C } from "../utils/constants";
import { useApp } from "../context/AppContext";
import { useSuppliers } from "../hooks/useSuppliers";
import { formatCurrency } from "../utils/formatCurrency";
import StatCard from "../components/dashboard/StatCard";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import SearchBar from "../components/ui/SearchBar";
import StatusBadge from "../components/ui/StatusBadge";
import Modal from "../components/ui/Modal";
import SupplierForm from "../components/forms/SupplierForm";

export default function Suppliers() {
  const { showToast } = useApp();
  const [modal, setModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const { suppliers, filtered, search, setSearch, createSupplier, loading } = useSuppliers();

  const getErrorMessage = (err) => {
    if (err?.errors?.length) return err.errors.map((e) => e.msg).join(", ");
    return err?.message || "Save failed";
  };

  const handleCreateSupplier = async (payload) => {
    try {
      await createSupplier(payload);
      showToast("success", "Supplier Added", "New supplier added successfully");
      setModal(false);
    } catch (err) {
      showToast("danger", "Save Failed", getErrorMessage(err));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        <StatCard label="Total Suppliers" value={suppliers.length} icon="🤝" color={C.primary} />
        <StatCard label="Active" value={suppliers.filter((s) => s.status === "Active").length} icon="✅" color={C.success} />
        <StatCard label="Total Products" value={suppliers.reduce((total, s) => total + (s.products || 0), 0)} icon="📦" color={C.accent} />
        <StatCard label="Total Orders" value={suppliers.reduce((total, s) => total + (s.orders || 0), 0)} icon="🛒" color={C.warning} />
      </div>

      <Card>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ width: 260 }}>
            <SearchBar placeholder="Search suppliers..." value={search} onChange={setSearch} />
          </div>
          <Button size="sm" variant="primary" onClick={() => setModal(true)}>+ Add Supplier</Button>
        </div>

        {loading ? (
          <div style={{ padding: 24, color: C.textMuted }}>Loading suppliers...</div>
        ) : (
          <div style={{ padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {filtered.map((s) => (
              <Card key={s._id || s.id} style={{ padding: 22, border: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14 }}>
                      {s.name?.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 15, color: C.text }}>{s.name}</div>
                      <div style={{ fontSize: 13, color: C.textMuted }}>{s.contactPerson || s.contact || s.email}</div>
                    </div>
                  </div>
                  <StatusBadge status={s.status || "Active"} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 13, marginBottom: 14 }}>
                  {[
                    { icon: "✉️", val: s.email },
                    { icon: "📞", val: s.phone },
                    { icon: "📍", val: s.location },
                    { icon: "🌐", val: s.website || "—" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, color: C.textMuted }}>
                      <span>{item.icon}</span>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.val}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: `1px solid ${C.border}`, fontSize: 13 }}>
                  <div style={{ textAlign: "center" }}><div style={{ fontWeight: 800, color: C.text }}>{s.products ?? 0}</div><div style={{ color: C.textMuted }}>Products</div></div>
                  <div style={{ textAlign: "center" }}><div style={{ fontWeight: 800, color: C.text }}>{s.orders ?? 0}</div><div style={{ color: C.textMuted }}>Orders</div></div>
                  <div style={{ textAlign: "center" }}><div style={{ fontWeight: 800, color: C.primary }}>{formatCurrency(s.balance ?? 0)}</div><div style={{ color: C.textMuted }}>Balance</div></div>
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <Button size="sm" variant="outline" style={{ flex: 1 }} onClick={() => setSelectedSupplier(s)}>
                      View Profile
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => showToast("success", "Contact Sent", `Message sent to ${s.contactPerson || s.name}`)}>
                      Contact
                    </Button>
                  </div>
                </Card>
              ))}
          </div>
        )}
      </Card>

      <Modal open={modal} onClose={() => setModal(false)} title="Add New Supplier">
        <SupplierForm
          onCancel={() => setModal(false)}
          onSubmit={handleCreateSupplier}
        />
      </Modal>

      <Modal
        open={Boolean(selectedSupplier)}
        onClose={() => setSelectedSupplier(null)}
        title={selectedSupplier ? `Supplier Profile — ${selectedSupplier.name}` : "Supplier Profile"}
        width={640}
      >
        {selectedSupplier && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div style={{ fontSize: 12, color: C.textMuted, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>
                  Company Name
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: C.text }}>{selectedSupplier.name}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: C.textMuted, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>
                  Contact Person
                </div>
                <div style={{ fontSize: 16, color: C.text }}>{selectedSupplier.contact}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: C.textMuted, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>
                  Email
                </div>
                <div style={{ fontSize: 16, color: C.text }}>{selectedSupplier.email}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: C.textMuted, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>
                  Phone
                </div>
                <div style={{ fontSize: 16, color: C.text }}>{selectedSupplier.phone}</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div style={{ fontSize: 12, color: C.textMuted, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>
                  Location
                </div>
                <div style={{ fontSize: 16, color: C.text }}>{selectedSupplier.location}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: C.textMuted, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>
                  Website
                </div>
                <div style={{ fontSize: 16, color: C.text }}>{selectedSupplier.website || "—"}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ background: "#F8FAFC", borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 8 }}>Products</div>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>{selectedSupplier.products ?? 0}</div>
                </div>
                <div style={{ background: "#F8FAFC", borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 8 }}>Orders</div>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>{selectedSupplier.orders ?? 0}</div>
                </div>
              </div>
              <div style={{ background: "#F8FAFC", borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 8 }}>Status</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{selectedSupplier.status || "Active"}</div>
              </div>
              <div style={{ background: "#F8FAFC", borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 8 }}>Balance</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{selectedSupplier.balance != null ? formatCurrency(selectedSupplier.balance) : formatCurrency(0)}</div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
