import { C } from "../../utils/constants";

export default function SearchBar({ placeholder, value, onChange }) {
  return (
    <div style={{ position: "relative" }}>
      <span
        style={{
          position: "absolute",
          left: 12,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: 16,
          color: C.textMuted,
        }}
      >
        🔍
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search..."}
        style={{
          paddingLeft: 38,
          paddingRight: 14,
          paddingTop: 9,
          paddingBottom: 9,
          border: `1.5px solid ${C.border}`,
          borderRadius: 9,
          fontSize: 14,
          fontFamily: "inherit",
          outline: "none",
          width: "100%",
          boxSizing: "border-box",
          background: "#F8FAFC",
          color: C.text,
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = C.primary)}
        onBlur={(e) => (e.target.style.borderColor = C.border)}
      />
    </div>
  );
}
