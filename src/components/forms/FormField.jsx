import { C } from "../../utils/constants";

export function FormField({ label, required, children, error }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: C.text }}>
        {label}
        {required && <span style={{ color: C.danger }}> *</span>}
      </label>
      {children}
      {error && <span style={{ fontSize: 12, color: C.danger }}>{error}</span>}
    </div>
  );
}
