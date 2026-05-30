import { useState } from "react";
import { FormField } from "./FormField";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function SupplierForm({ initialData = {}, onSubmit, onCancel }) {
  const [companyName, setCompanyName] = useState(initialData.name || initialData.companyName || "");
  const [contact, setContact] = useState(initialData.contact || initialData.contactPerson || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [phone, setPhone] = useState(initialData.phone || "");
  const [location, setLocation] = useState(initialData.location || "");
  const [website, setWebsite] = useState(initialData.website || "");

  const handleSubmit = () => {
    onSubmit({
      name: companyName,
      contact,
      email,
      phone,
      location,
      website,
    });
  };

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <FormField label="Company Name" required>
          <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Enter company name" />
        </FormField>
        <FormField label="Contact Person" required>
          <Input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Enter contact person" />
        </FormField>
        <FormField label="Email" required>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
        </FormField>
        <FormField label="Phone" required>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone" />
        </FormField>
        <FormField label="Location" required>
          <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter location" />
        </FormField>
        <FormField label="Website">
          <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Enter website" />
        </FormField>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Add Supplier</Button>
      </div>
    </>
  );
}
