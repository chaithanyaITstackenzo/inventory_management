import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { C } from "../../utils/constants";
import Badge from "../ui/Badge";
import { NOTIFICATIONS } from "../../data/notifications";

export default function Topbar({ title, sidebarWidth, notifOpen, setNotifOpen, showToast }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, signOut } = useApp();
  const initials = user ? `${(user.firstName||"")[0] || ""}${(user.lastName||"")[0] || ""}`.toUpperCase() : "VN";
  const displayName = user ? `${user.firstName} ${user.lastName}` : "Vikram Nair";
  const displayRole = user ? (user.role || "Admin") : "Admin";
  const unread = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: sidebarWidth,
        right: 0,
        height: 64,
        background: C.card,
        borderBottom: `1px solid ${C.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        zIndex: 99,
        transition: "left 0.25s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: C.text, letterSpacing: "-0.3px" }}>
        {title}
      </h1>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Search */}
        <div style={{ position: "relative", width: 200 }}>
          <span
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: C.textMuted,
              fontSize: 15,
            }}
          >
            🔍
          </span>
          <input
            placeholder="Quick search..."
            style={{
              paddingLeft: 32,
              paddingRight: 10,
              paddingTop: 8,
              paddingBottom: 8,
              border: `1.5px solid ${C.border}`,
              borderRadius: 8,
              fontSize: 13,
              fontFamily: "inherit",
              outline: "none",
              width: "100%",
              boxSizing: "border-box",
              background: "#F8FAFC",
            }}
          />
        </div>

        {/* Notifications */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            style={{
              background: "#F1F5F9",
              border: `1px solid ${C.border}`,
              borderRadius: 9,
              width: 38,
              height: 38,
              cursor: "pointer",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            🔔
            {unread > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: C.danger,
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #fff",
                }}
              >
                {unread}
              </span>
            )}
          </button>

          {notifOpen && (
            <div
              style={{
                position: "absolute",
                top: 46,
                right: 0,
                width: 360,
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 14,
                boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                zIndex: 999,
              }}
            >
              <div
                style={{
                  padding: "14px 16px",
                  borderBottom: `1px solid ${C.border}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: 800, color: C.text, fontSize: 15 }}>Notifications</span>
                <Badge color="danger">{unread} new</Badge>
              </div>
              {NOTIFICATIONS.map((n) => (
                <div
                  key={n.id}
                  style={{
                    padding: "12px 16px",
                    borderBottom: `1px solid ${C.border}`,
                    background: n.read ? "transparent" : C.primaryLight + "40",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FAFC")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = n.read ? "transparent" : C.primaryLight + "40")
                  }
                >
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 18 }}>
                      {n.type === "warning" ? "⚠️" : n.type === "danger" ? "🔴" : n.type === "success" ? "✅" : "ℹ️"}
                    </span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: C.text }}>{n.title}</div>
                      <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{n.msg}</div>
                      <div style={{ fontSize: 11, color: C.textLight, marginTop: 4 }}>{n.time}</div>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ padding: "10px 16px", textAlign: "center" }}>
                <button
                  style={{
                    color: C.primary,
                    fontSize: 13,
                    fontWeight: 700,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#F1F5F9",
              border: `1px solid ${C.border}`,
              borderRadius: 9,
              padding: "5px 10px 5px 5px",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
              <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 800,
                fontSize: 13,
              }}
            >
              {initials}
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>{displayName}</div>
              <div style={{ fontSize: 11, color: C.textMuted }}>{displayRole}</div>
            </div>
          </button>

          {profileOpen && (
            <div
              style={{
                position: "absolute",
                top: 46,
                right: 0,
                width: 200,
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                zIndex: 999,
                overflow: "hidden",
              }}
            >
              {["👤 Profile", "⚙️ Settings", "🔐 Security", "❓ Help"].map((item) => (
                <button
                  key={item}
                  style={{
                    width: "100%",
                    padding: "10px 16px",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    fontSize: 14,
                    cursor: "pointer",
                    color: C.text,
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FAFC")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                >
                  {item}
                </button>
              ))}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button
                  style={{
                    width: "100%",
                    padding: "10px 16px",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    fontSize: 14,
                    cursor: "pointer",
                    color: C.danger,
                    fontFamily: "inherit",
                  }}
                onClick={() => signOut()}
                >
                  🚪 Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
