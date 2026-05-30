export const C = {
  primary: "#2563EB",
  primaryDark: "#1D4ED8",
  primaryLight: "#DBEAFE",
  secondary: "#0F172A",
  accent: "#14B8A6",
  accentLight: "#CCFBF1",
  warning: "#F59E0B",
  warningLight: "#FEF3C7",
  danger: "#EF4444",
  dangerLight: "#FEE2E2",
  success: "#22C55E",
  successLight: "#DCFCE7",
  bg: "#F1F5F9",
  card: "#FFFFFF",
  border: "#E2E8F0",
  text: "#0F172A",
  textMuted: "#64748B",
  textLight: "#94A3B8",
  sidebar: "#0F172A",
  sidebarActive: "#1E293B",
};

export const STATUS_COLOR_MAP = {
  "In Stock": "success",
  "Low Stock": "warning",
  "Out of Stock": "danger",
  Active: "success",
  Inactive: "muted",
  Delivered: "success",
  Shipped: "accent",
  Processing: "primary",
  Pending: "warning",
  Cancelled: "danger",
  Paid: "success",
  Refunded: "muted",
};

export const NAV_GROUPS = [
  {
    label: "Main",
    items: [
      { page: "dashboard", icon: "⊞", label: "Dashboard" },
      { page: "inventory", icon: "📦", label: "Inventory" },
      { page: "products", icon: "🏷️", label: "Products" },
      { page: "orders", icon: "🛒", label: "Orders" },
    ],
  },
  {
    label: "Management",
    items: [
      { page: "suppliers", icon: "🤝", label: "Suppliers" },
      { page: "analytics", icon: "📊", label: "Analytics" },
      { page: "reports", icon: "📋", label: "Reports" },
    ],
  },
  {
    label: "System",
    items: [{ page: "settings", icon: "⚙️", label: "Settings" }],
  },
];

export const PAGE_TITLES = {
  dashboard: "Dashboard",
  inventory: "Inventory Management",
  products: "Products",
  orders: "Orders",
  suppliers: "Suppliers",
  analytics: "Analytics",
  reports: "Reports",
  settings: "Settings",
};
