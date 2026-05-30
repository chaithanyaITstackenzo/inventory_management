import { useState } from "react";
import { C } from "../../utils/constants";
import { FormField } from "./FormField";
import Input from "../ui/Input";
import Button from "../ui/Button";

const categoryOptions = ["Electronics", "Peripherals", "Furniture", "Accessories", "Other"];

export default function ProductForm({ initialData = {}, onSubmit, onCancel }) {
  const [name, setName] = useState(initialData.name || "");
  const [sku, setSku] = useState(initialData.sku || "");
  const [category, setCategory] = useState(initialData.category || categoryOptions[0]);
  const [price, setPrice] = useState(initialData.price || "");
  const [cost, setCost] = useState(initialData.cost || "");
  const [qty, setQty] = useState(initialData.qty || "");
  const [minQty, setMinQty] = useState(initialData.minQty || "");
  const [supplier, setSupplier] = useState(initialData.supplier || "");
  const [description, setDescription] = useState(initialData.description || "");

  const handleSubmit = () => {
    onSubmit({
      name,
      sku,
      category,
      price: Number(price),
      cost: Number(cost),
      qty: Number(qty),
      minQty: Number(minQty),
      supplier,
      description,
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div
        style={{
          border: "2px dashed #E2E8F0",
          borderRadius: 12,
          padding: 28,
          textAlign: "center",
          cursor: "pointer",
          background: "#F8FAFC",
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 8 }}>📷</div>
        <div style={{ fontSize: 14, color: C.textMuted }}>Click to upload product image</div>
        <div style={{ fontSize: 12, color: C.textLight }}>PNG, JPG up to 5MB</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <FormField label="Product Name" required>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter product name" />
        </FormField>
        <FormField label="SKU" required>
          <Input value={sku} onChange={(e) => setSku(e.target.value)} placeholder="e.g. PRD-001" />
        </FormField>
        <FormField label="Category" required>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${C.border}`, borderRadius: 8, fontSize: 14, background: "#fff", color: category ? C.text : C.textMuted }}>
            <option value="" disabled>
              Select category
            </option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Supplier" required>
          <Input value={supplier} onChange={(e) => setSupplier(e.target.value)} placeholder="Supplier name" />
        </FormField>
        <FormField label="Initial Stock" required>
          <Input type="number" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="0" />
        </FormField>
        <FormField label="Minimum Stock" required>
          <Input type="number" value={minQty} onChange={(e) => setMinQty(e.target.value)} placeholder="0" />
        </FormField>
        <FormField label="Price (₹)" required>
          <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0" />
        </FormField>
        <FormField label="Cost Price (₹)" required>
          <Input type="number" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="0" />
        </FormField>
      </div>
      <FormField label="Description">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product description..."
          rows={3}
          style={{
            padding: "10px 12px",
            border: `1.5px solid ${C.border}`,
            borderRadius: 8,
            fontSize: 14,
            fontFamily: "inherit",
            resize: "vertical",
            outline: "none",
          }}
        />
      </FormField>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Add Product</Button>
      </div>
    </div>
  );
}
