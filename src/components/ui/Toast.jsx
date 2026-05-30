import { C } from "../../utils/constants";

export default function Toast({ toasts }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="toast-slide"
          style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            borderLeft: `4px solid ${
              t.type === "success" ? C.success : t.type === "danger" ? C.danger : C.warning
            }`,
            borderRadius: 10,
            padding: "12px 16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            maxWidth: 320,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{t.title}</div>
          <div style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>{t.msg}</div>
        </div>
      ))}
    </div>
  );
}
