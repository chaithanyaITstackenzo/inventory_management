import { useState } from "react";
import { C } from "../utils/constants";
import { useApp } from "../context/AppContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { FormField } from "../components/forms/FormField";

export default function Login() {
  const { changePage, setAuthed, setUser } = useApp();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!form.email || !form.password) { setError("Please fill in all fields"); return; }

    setError("");
    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, password: form.password }),
    })
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw new Error(body.message || "Login failed");
        const { token, user } = body.data;
        localStorage.setItem("token", token);
        setAuthed(true);
        if (setUser) setUser(user);
        changePage("dashboard");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${C.secondary} 0%, #1E3A5F 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          background: C.card,
          borderRadius: 20,
          padding: "44px 40px",
          width: "100%",
          maxWidth: 420,
          boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 32 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📊</div>
          <div style={{ fontWeight: 900, fontSize: 22, color: C.text, fontFamily: "'Sora', sans-serif" }}>StockFlow</div>
        </div>

        <h2 style={{ textAlign: "center", fontWeight: 800, fontSize: 22, color: C.text, margin: "0 0 6px" }}>Welcome back</h2>
        <p style={{ textAlign: "center", color: C.textMuted, fontSize: 14, marginBottom: 28 }}>Sign in to your account</p>

        {error && (
          <div style={{ background: C.dangerLight, color: C.danger, padding: "10px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <FormField label="Email">
            <Input type="email" placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </FormField>
          <FormField label="Password">
            <Input type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </FormField>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button style={{ background: "none", border: "none", color: C.primary, fontSize: 13, cursor: "pointer", fontWeight: 600 }}>Forgot password?</button>
          </div>
          <Button variant="primary" onClick={handleLogin} style={{ width: "100%", justifyContent: "center", padding: "13px", fontSize: 15 }}>
            Sign In
          </Button>
        </div>

        <div style={{ textAlign: "center", marginTop: 20, color: C.textMuted, fontSize: 13 }}>
          Don't have an account?{" "}
          <button
            onClick={() => changePage("register")}
            style={{ background: "none", border: "none", color: C.primary, fontWeight: 700, cursor: "pointer", fontSize: 13 }}
          >
            Register
          </button>
        </div>

        <div style={{ margin: "20px 0", position: "relative", textAlign: "center" }}>
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: C.border }} />
          <span style={{ position: "relative", background: C.card, padding: "0 12px", fontSize: 12, color: C.textMuted }}>OR CONTINUE WITH</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {["🌐 Google", "💼 Microsoft"].map((s) => (
            <Button key={s} variant="ghost" style={{ justifyContent: "center", width: "100%" }}>{s}</Button>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: C.textLight }}>
          Demo: any email + any password
        </div>
      </div>
    </div>
  );
}
