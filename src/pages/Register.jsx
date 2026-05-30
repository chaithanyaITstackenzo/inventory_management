import { useState } from "react";
import { C } from "../utils/constants";
import { useApp } from "../context/AppContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { FormField } from "../components/forms/FormField";

export default function Register() {
  const { changePage, setAuthed, setUser } = useApp();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password) { setError("Please fill in all fields"); return; }

    setError("");
    fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw new Error(body.message || "Registration failed");
        const { token, user } = body.data;
        localStorage.setItem("token", token);
        setAuthed(true);
        if (setUser) setUser(user);
        changePage("dashboard");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.secondary} 0%, #1E3A5F 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: C.card, borderRadius: 20, padding: "44px 40px", width: "100%", maxWidth: 520, boxShadow: "0 24px 60px rgba(0,0,0,0.2)" }}>
        <h2 style={{ textAlign: "center", fontWeight: 800, fontSize: 22, color: C.text, margin: "0 0 6px" }}>Create an account</h2>

        {error && (
          <div style={{ background: C.dangerLight, color: C.danger, padding: "10px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>{error}</div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <FormField label="First name">
              <Input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
            </FormField>
            <FormField label="Last name">
              <Input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
            </FormField>
          </div>

          <FormField label="Email">
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </FormField>

          <FormField label="Password">
            <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </FormField>

          <Button variant="primary" onClick={handleRegister} style={{ width: "100%", justifyContent: "center", padding: "13px", fontSize: 15 }}>Register</Button>

          <div style={{ textAlign: "center", marginTop: 8, color: C.textMuted, fontSize: 13 }}>
            Already have an account?{" "}
            <button onClick={() => changePage("login")} style={{ background: "none", border: "none", color: C.primary, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Sign in</button>
          </div>
        </div>
      </div>
    </div>
  );
}
