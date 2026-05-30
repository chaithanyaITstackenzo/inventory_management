import { useState, useEffect } from "react";
import { FormField } from "./FormField";
import Input from "../ui/Input";
import Button from "../ui/Button";

const categoryOptions = ["Electronics", "Peripherals", "Furniture", "Accessories", "Other"];

export default function InventoryForm({ item = {}, onSubmit, onCancel, isEdit }) {
  const [name, setName] = useState(item.name || "");
  const [sku, setSku] = useState(item.sku || "");
  const [category, setCategory] = useState(item.category || categoryOptions[0]);
  const [qty, setQty] = useState(item.qty ?? "");
  const [minQty, setMinQty] = useState(item.minQty ?? "");
  const [price, setPrice] = useState(item.price ?? "");
  const [cost, setCost] = useState(item.cost ?? "");
  const [supplier, setSupplier] = useState(item.supplier || "");

  useEffect(() => {
    setName(item.name || "");
    setSku(item.sku || "");
    setCategory(item.category || categoryOptions[0]);
    setQty(item.qty ?? "");
    setMinQty(item.minQty ?? "");
    setPrice(item.price ?? "");
    setCost(item.cost ?? "");
    setSupplier(item.supplier || "");
  }, [item]);

  const handleSubmit = () => {
    onSubmit({
      name,
      sku,
      category,
      qty: Number(qty),
      minQty: Number(minQty),
      price: Number(price),
      cost: Number(cost),
      supplier,
    });
  };

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <FormField label="Product Name" required>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Dell XPS 15 Laptop" />
        </FormField>
        <FormField label="SKU" required>
          <Input value={sku} onChange={(e) => setSku(e.target.value)} placeholder="e.g. LAP-DXP-001" />
        </FormField>
        <FormField label="Category" required>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: `1.5px solid #E2E8F0`, borderRadius: 8, fontSize: 14, background: "#fff", color: category ? "#0F172A" : "#64748B" }}>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Quantity" required>
          <Input type="number" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="0" />
        </FormField>
        <FormField label="Min Quantity" required>
          <Input type="number" value={minQty} onChange={(e) => setMinQty(e.target.value)} placeholder="0" />
        </FormField>
        <FormField label="Sell Price (₹)" required>
          <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0" />
        </FormField>
        <FormField label="Cost Price (₹)" required>
          <Input type="number" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="0" />
        </FormField>
        <FormField label="Supplier">
          <Input value={supplier} onChange={(e) => setSupplier(e.target.value)} placeholder="Supplier name" />
        </FormField>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>
          {isEdit ? "Save Changes" : "Add Item"}
        </Button>
      </div>
    </>
  );
}
