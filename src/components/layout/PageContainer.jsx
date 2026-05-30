export default function PageContainer({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {children}
    </div>
  );
}
