import { C, NAV_GROUPS } from "../../utils/constants";

export default function Sidebar({ currentPage, setPage, collapsed, setCollapsed }) {
  return (
    <aside
      style={{
        width: collapsed ? 72 : 240,
        background: C.sidebar,
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)",
        overflow: "hidden",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "20px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          minHeight: 64,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          📊
        </div>
        {!collapsed && (
          <div>
            <div
              style={{
                color: "#fff",
                fontWeight: 800,
                fontSize: 16,
                letterSpacing: "-0.3px",
                fontFamily: "'Sora', sans-serif",
              }}
            >
              StockFlow
            </div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: -1 }}>
              Inventory Suite
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 10px" }}>
        {NAV_GROUPS.map((group) => (
          <div key={group.label} style={{ marginBottom: 6 }}>
            {!collapsed && (
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.25)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  padding: "8px 8px 4px",
                }}
              >
                {group.label}
              </div>
            )}
            {group.items.map((item) => {
              const active = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => setPage(item.page)}
                  title={collapsed ? item.label : undefined}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: collapsed ? "10px 0" : "10px 12px",
                    justifyContent: collapsed ? "center" : "flex-start",
                    borderRadius: 10,
                    border: "none",
                    background: active ? "rgba(37,99,235,0.3)" : "transparent",
                    color: active ? "#fff" : "rgba(255,255,255,0.55)",
                    fontWeight: active ? 700 : 500,
                    fontSize: 14,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    marginBottom: 2,
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) =>
                    !active && (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
                  }
                  onMouseLeave={(e) =>
                    !active && (e.currentTarget.style.background = "transparent")
                  }
                >
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                  {!collapsed && <span style={{ flex: 1, textAlign: "left" }}>{item.label}</span>}
                  {!collapsed && active && (
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: C.primary,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Collapse Toggle */}
      <div style={{ padding: "12px 10px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            width: "100%",
            padding: "9px 12px",
            borderRadius: 9,
            border: "none",
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.5)",
            cursor: "pointer",
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "inherit",
          }}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>
    </aside>
  );
}
