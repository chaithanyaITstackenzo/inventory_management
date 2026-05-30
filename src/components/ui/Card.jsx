import { C } from "../../utils/constants";

export default function Card({ children, style: sx = {}, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: C.card,
        borderRadius: 14,
        border: `1px solid ${C.border}`,
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        cursor: onClick ? "pointer" : "default",
        ...sx,
      }}
    >
      {children}
    </div>
  );
}
