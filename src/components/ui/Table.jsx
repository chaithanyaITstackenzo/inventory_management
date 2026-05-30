import { C } from "../../utils/constants";

export default function Table({ columns, data, onRowClick }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ background: "#F8FAFC" }}>
            {columns.map((col) => (
              <th
                key={col.key + col.label}
                style={{
                  padding: "11px 16px",
                  textAlign: "left",
                  fontWeight: 700,
                  color: C.textMuted,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  borderBottom: `1.5px solid ${C.border}`,
                  whiteSpace: "nowrap",
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              onClick={() => onRowClick && onRowClick(row)}
              style={{
                borderBottom: `1px solid ${C.border}`,
                transition: "background 0.15s",
                cursor: onRowClick ? "pointer" : "default",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FAFC")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {columns.map((col) => (
                <td key={col.key + col.label} style={{ padding: "12px 16px", color: C.text, verticalAlign: "middle" }}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} style={{ padding: 48, textAlign: "center", color: C.textMuted }}>
                <div style={{ fontSize: 40 }}>📭</div>
                <div style={{ marginTop: 8, fontWeight: 600 }}>No records found</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
