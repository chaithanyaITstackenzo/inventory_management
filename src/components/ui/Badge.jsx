import { C } from "../../utils/constants";

const colorMap = {
  primary: { bg: C.primaryLight, color: C.primaryDark },
  success: { bg: C.successLight, color: "#15803D" },
  warning: { bg: C.warningLight, color: "#B45309" },
  danger: { bg: C.dangerLight, color: "#B91C1C" },
  accent: { bg: C.accentLight, color: "#0F766E" },
  muted: { bg: "#F1F5F9", color: C.textMuted },
};

export default function Badge({ children, color = "primary" }) {
  const s = colorMap[color] || colorMap.muted;
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        borderRadius: 6,
        padding: "3px 10px",
        fontSize: 12,
        fontWeight: 700,
        display: "inline-block",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
