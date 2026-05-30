import { useState, useEffect } from "react";
import { C } from "../../utils/constants";
import { formatNumber } from "../../utils/formatNumber";
import Card from "../ui/Card";

export default function StatCard({ label, value, delta, icon, color = C.primary, prefix = "", suffix = "" }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const num = typeof value === "number" ? value : parseFloat(String(value).replace(/[^0-9.]/g, ""));
    if (isNaN(num)) return;
    let start = 0;
    const steps = 40;
    const inc = num / steps;
    const id = setInterval(() => {
      start += inc;
      if (start >= num) { setDisplayed(num); clearInterval(id); }
      else setDisplayed(Math.floor(start));
    }, 30);
    return () => clearInterval(id);
  }, [value]);

  const displayVal = typeof value === "number" ? formatNumber(displayed) : value;
  const isPositive = delta && !delta.startsWith("-");

  return (
    <Card style={{ padding: 22, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: C.textMuted,
              marginBottom: 6,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {label}
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: C.text, letterSpacing: "-0.5px" }}>
            {prefix}{displayVal}{suffix}
          </div>
        </div>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 12,
            background: color + "18",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
          }}
        >
          {icon}
        </div>
      </div>
      {delta && (
        <div style={{ fontSize: 13, color: isPositive ? C.success : C.danger, fontWeight: 600 }}>
          {isPositive ? "▲" : "▼"} {delta} vs last month
        </div>
      )}
    </Card>
  );
}
