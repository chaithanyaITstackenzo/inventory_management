import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [currentPage, setCurrentPage] = useState("login");
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const showToast = (type, title, msg) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, title, msg }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  };

  const changePage = (page) => {
    setCurrentPage(page);
    setNotifOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    // fetch profile
    fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        const body = await res.json();
        setUser(body.data);
        setAuthed(true);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
        setAuthed(false);
      });
  }, []);

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    setAuthed(false);
    setCurrentPage("login");
  };

  return (
    <AppContext.Provider
      value={{
        toasts,
        showToast,
        currentPage,
        changePage,
        authed,
        setAuthed,
        user,
        setUser,
        sidebarCollapsed,
        setSidebarCollapsed,
        notifOpen,
        setNotifOpen,
        signOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
