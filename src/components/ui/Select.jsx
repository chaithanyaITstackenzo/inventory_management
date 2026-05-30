import { C } from "../../utils/constants";

export default function Select({ children, style: sx = {}, ...props }) {
  return (
    <select
      {...props}
      style={{
        padding: "10px 12px",
        border: `1.5px solid ${C.border}`,
        borderRadius: 8,
        fontSize: 14,
        fontFamily: "inherit",
        outline: "none",
        background: "#F8FAFC",
        cursor: "pointer",
        ...sx,
      }}
    >
      {children}
    </select>
  );
}
