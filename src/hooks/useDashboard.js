import { useState, useEffect } from "react";
import { apiGet } from "../utils/api";

export function useDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSuppliers: 0,
    totalOrders: 0,
    activeOrders: 0,
    totalRevenue: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    lowStockItems: [],
  });
  const [analytics, setAnalytics] = useState({ revenueData: [], categoryData: [], stockTrend: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      try {
        const statsData = await apiGet("/api/dashboard/stats");
        const analyticsData = await apiGet("/api/dashboard/analytics");
        setStats(statsData);
        setAnalytics(analyticsData);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  return {
    ...stats,
    ...analytics,
    loading,
  };
}
