import { useApp } from "../context/AppContext";
import MainLayout from "../components/layout/MainLayout";
import Toast from "../components/ui/Toast";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Inventory from "../pages/Inventory";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import Suppliers from "../pages/Suppliers";
import Analytics from "../pages/Analytics";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";

const PAGE_MAP = {
  dashboard: Dashboard,
  inventory: Inventory,
  products: Products,
  orders: Orders,
  suppliers: Suppliers,
  analytics: Analytics,
  reports: Reports,
  settings: Settings,
};

export default function AppRoutes() {
  const { currentPage, authed, toasts } = useApp();

  if (!authed) {
    if (currentPage === "register") {
      return (
        <>
          <Register />
          <Toast toasts={toasts} />
        </>
      );
    }

    return (
      <>
        <Login />
        <Toast toasts={toasts} />
      </>
    );
  }

  const PageComponent = PAGE_MAP[currentPage] || Dashboard;

  return (
    <MainLayout>
      <PageComponent />
    </MainLayout>
  );
}
