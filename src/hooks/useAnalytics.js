import { useState, useEffect } from "react";
import { apiGet } from "../utils/api";

export function useAnalytics() {
  const [analytics, setAnalytics] = useState({
    revenueData: [],
    stockTrend: [],
    topProducts: [],
    categoryData: [],
    totalRevenue: 0,
    totalOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      try {
        const data = await apiGet("/api/dashboard/analytics");
        setAnalytics({
          revenueData: data.revenueData || [],
          stockTrend: data.stockTrend || [],
          topProducts: data.topProducts || [],
          categoryData: data.categoryData || [],
          totalRevenue: data.totalRevenue || 0,
          totalOrders: data.totalOrders || 0,
        });
      } catch (err) {
        console.error("Failed to load analytics data", err);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  const avgOrderValue = analytics.totalOrders ? Math.round(analytics.totalRevenue / analytics.totalOrders) : 0;

  return {
    ...analytics,
    avgOrderValue,
    loading,
  };
}
