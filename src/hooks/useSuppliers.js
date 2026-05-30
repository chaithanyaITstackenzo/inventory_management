import { useState, useEffect } from "react";
import { apiGet, apiPost } from "../utils/api";

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const data = await apiGet(`/api/suppliers?search=${encodeURIComponent(search)}&status=${encodeURIComponent(statusFilter)}`);
      setSuppliers(data.data || data || []);
    } catch (err) {
      console.error("Failed to load suppliers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, [search, statusFilter]);

  const createSupplier = async (supplier) => {
    const created = await apiPost("/api/suppliers", supplier);
    setSuppliers((prev) => [created, ...prev]);
    return created;
  };

  const filtered = suppliers.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  return {
    suppliers,
    filtered,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    createSupplier,
    loading,
  };
}
