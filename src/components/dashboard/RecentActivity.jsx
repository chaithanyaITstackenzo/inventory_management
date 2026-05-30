import { C } from "../../utils/constants";
import Card from "../ui/Card";

export default function RecentActivity({ activities }) {
  return (
    <Card style={{ padding: 24 }}>
      <h3 style={{ margin: "0 0 16px", fontWeight: 800, color: C.text, fontSize: 16 }}>Recent Activity</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {activities.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 12,
              padding: "10px 0",
              borderBottom: i < activities.length - 1 ? `1px solid ${C.border}` : "none",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                background: "#F1F5F9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              {item.icon}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{item.text}</div>
              <div style={{ fontSize: 12, color: C.textLight, marginTop: 2 }}>{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
