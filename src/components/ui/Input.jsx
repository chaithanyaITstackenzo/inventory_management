import { C } from "../../utils/constants";

export default function Input({ style: sx = {}, ...props }) {
  return (
    <input
      {...props}
      style={{
        padding: "10px 12px",
        border: `1.5px solid ${C.border}`,
        borderRadius: 8,
        fontSize: 14,
        fontFamily: "inherit",
        outline: "none",
        background: "#F8FAFC",
        transition: "border-color 0.2s",
        width: "100%",
        boxSizing: "border-box",
        ...sx,
      }}
      onFocus={(e) => (e.target.style.borderColor = C.primary)}
      onBlur={(e) => (e.target.style.borderColor = C.border)}
    />
  );
}
