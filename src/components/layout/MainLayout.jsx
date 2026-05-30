import { useApp } from "../../context/AppContext";
import { PAGE_TITLES } from "../../utils/constants";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Toast from "../ui/Toast";

export default function MainLayout({ children }) {
  const {
    currentPage,
    changePage,
    sidebarCollapsed,
    setSidebarCollapsed,
    notifOpen,
    setNotifOpen,
    showToast,
    toasts,
  } = useApp();

  const sidebarWidth = sidebarCollapsed ? 72 : 240;

  return (
    <div
      style={{ background: "#F1F5F9", minHeight: "100vh" }}
      onClick={() => { if (notifOpen) setNotifOpen(false); }}
    >
      <Sidebar
        currentPage={currentPage}
        setPage={changePage}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div style={{ marginLeft: sidebarWidth, transition: "margin-left 0.25s cubic-bezier(0.4,0,0.2,1)" }}>
        <Topbar
          title={PAGE_TITLES[currentPage] || "Dashboard"}
          sidebarWidth={sidebarWidth}
          notifOpen={notifOpen}
          setNotifOpen={setNotifOpen}
          showToast={showToast}
        />
        <main style={{ padding: "88px 24px 32px" }}>{children}</main>
      </div>
      <Toast toasts={toasts} />
    </div>
  );
}
