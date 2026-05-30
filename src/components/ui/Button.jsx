import { C } from "../../utils/constants";

const sizes = {
  sm: { padding: "7px 14px", fontSize: 13 },
  md: { padding: "10px 20px", fontSize: 14 },
  lg: { padding: "13px 28px", fontSize: 15 },
};

const variants = {
  primary: { background: C.primary, color: "#fff", border: "none", boxShadow: "0 2px 8px rgba(37,99,235,0.3)" },
  secondary: { background: C.secondary, color: "#fff", border: "none" },
  outline: { background: "transparent", color: C.primary, border: `1.5px solid ${C.primary}` },
  ghost: { background: "transparent", color: C.textMuted, border: `1.5px solid ${C.border}` },
  danger: { background: C.danger, color: "#fff", border: "none", boxShadow: "0 2px 8px rgba(239,68,68,0.3)" },
  success: { background: C.success, color: "#fff", border: "none" },
};

export default function Button({ children, variant = "primary", onClick, style: sx = {}, disabled = false, size = "md" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...sizes[size],
        ...variants[variant],
        borderRadius: 9,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        transition: "all 0.18s",
        fontFamily: "inherit",
        ...sx,
      }}
      onMouseEnter={(e) => !disabled && (e.currentTarget.style.filter = "brightness(1.08)")}
      onMouseLeave={(e) => !disabled && (e.currentTarget.style.filter = "brightness(1)")}
    >
      {children}
    </button>
  );
}
