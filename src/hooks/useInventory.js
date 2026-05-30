import { useState, useEffect } from "react";
import { apiGet, apiDelete, apiPost, apiPatch } from "../utils/api";

export function useInventory() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await apiGet(`/api/products?limit=200`);
      setProducts((data || []).map((p) => ({ ...p, id: p._id })));
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (payload) => {
    const result = await apiPost("/api/products", payload);
    const product = { ...result, id: result._id };
    setProducts((prev) => [product, ...prev]);
    return product;
  };

  const updateProduct = async (id, payload) => {
    const result = await apiPatch(`/api/products/${id}`, payload);
    const product = { ...result, id: result._id };
    setProducts((prev) => prev.map((item) => (item.id === id ? product : item)));
    return product;
  };

  const deleteProduct = async (id) => {
    await apiDelete(`/api/products/${id}`);
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const bulkDeleteProducts = async (ids) => {
    await apiDelete("/api/products", { ids });
    setProducts((prev) => prev.filter((item) => !ids.includes(item.id)));
    setSelected([]);
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const statuses = ["All", "In Stock", "Low Stock", "Out of Stock"];

  const filtered = products.filter((p) => {
    const text = `${p.name} ${p.sku}`.toLowerCase();
    const matchSearch = text.includes(search.toLowerCase());
    const matchCat = catFilter === "All" || p.category === catFilter;
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  return {
    products,
    filtered,
    loading,
    search,
    setSearch,
    catFilter,
    setCatFilter,
    statusFilter,
    setStatusFilter,
    selected,
    setSelected,
    categories,
    statuses,
    addProduct,
    updateProduct,
    deleteProduct,
    bulkDeleteProducts,
    refresh: fetchProducts,
  };
}
