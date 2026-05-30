import { useState } from "react";
import { C } from "../utils/constants";
import { useApp } from "../context/AppContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { FormField } from "../components/forms/FormField";

const TABS = [
  { id: "profile", label: "👤 Profile" },
  { id: "company", label: "🏢 Company" },
  { id: "notifications", label: "🔔 Notifications" },
  { id: "security", label: "🔐 Security" },
  { id: "roles", label: "👥 Roles" },
];

const NOTIF_ITEMS = [
  { label: "Low Stock Alerts", desc: "Get notified when items fall below minimum quantity" },
  { label: "New Orders", desc: "Receive alerts for new incoming orders" },
  { label: "Order Status Updates", desc: "Track shipment and delivery changes" },
  { label: "Supplier Updates", desc: "Supplier payment and delivery notifications" },
  { label: "Weekly Reports", desc: "Receive weekly performance digest" },
  { label: "Security Alerts", desc: "Login attempts and security events" },
];

export default function Settings() {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>
      <Card style={{ padding: 12, alignSelf: "start" }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: 9,
              border: "none",
              background: activeTab === t.id ? C.primaryLight : "transparent",
              color: activeTab === t.id ? C.primaryDark : C.text,
              fontWeight: activeTab === t.id ? 700 : 500,
              fontSize: 14,
              cursor: "pointer",
              textAlign: "left",
              marginBottom: 2,
              fontFamily: "inherit",
              transition: "all 0.15s",
            }}
          >
            {t.label}
          </button>
        ))}
      </Card>

      <Card style={{ padding: 28 }}>
        {activeTab === "profile" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h3 style={{ margin: 0, fontWeight: 800, fontSize: 18, color: C.text }}>Profile Settings</h3>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 24 }}>VN</div>
              <Button variant="outline" size="sm">Change Photo</Button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                { label: "First Name", val: "Vikram" },
                { label: "Last Name", val: "Nair" },
                { label: "Email", val: "vikram@stockflow.in", type: "email" },
                { label: "Phone", val: "+91 98765 43210" },
              ].map((f) => (
                <FormField key={f.label} label={f.label}>
                  <Input type={f.type || "text"} defaultValue={f.val} />
                </FormField>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Button variant="primary" onClick={() => showToast("success", "Profile Saved", "Your profile has been updated")}>Save Changes</Button>
              <Button variant="ghost">Discard</Button>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h3 style={{ margin: 0, fontWeight: 800, fontSize: 18, color: C.text }}>Notification Preferences</h3>
            {NOTIF_ITEMS.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: "#F8FAFC", borderRadius: 10, border: `1px solid ${C.border}` }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: C.textMuted }}>{item.desc}</div>
                </div>
                <div style={{ width: 44, height: 24, borderRadius: 12, background: i < 4 ? C.primary : C.border, position: "relative", cursor: "pointer", transition: "background 0.2s", flexShrink: 0 }}>
                  <div style={{ position: "absolute", top: 2, left: i < 4 ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "security" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h3 style={{ margin: 0, fontWeight: 800, fontSize: 18, color: C.text }}>Security Settings</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[{ label: "Current Password" }, { label: "New Password" }, { label: "Confirm Password" }].map((f) => (
                <FormField key={f.label} label={f.label}>
                  <Input type="password" placeholder="••••••••••" />
                </FormField>
              ))}
            </div>
            <Button variant="primary" style={{ alignSelf: "flex-start" }} onClick={() => showToast("success", "Password Updated", "Your password has been changed")}>
              Update Password
            </Button>
            <div style={{ padding: "16px 20px", background: C.warningLight, borderRadius: 10, border: "1px solid #FDE68A" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#92400E", marginBottom: 4 }}>⚠️ Two-Factor Authentication</div>
              <div style={{ fontSize: 13, color: "#92400E", marginBottom: 12 }}>Enhance your account security with 2FA via SMS or authenticator app.</div>
              <Button size="sm" variant="primary">Enable 2FA</Button>
            </div>
          </div>
        )}

        {(activeTab === "company" || activeTab === "roles") && (
          <div style={{ textAlign: "center", padding: "48px 0", color: C.textMuted }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>{activeTab === "company" ? "🏢" : "👥"}</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 6 }}>
              {activeTab === "company" ? "Company Settings" : "Role Permissions"}
            </div>
            <div>Settings panel ready for backend integration</div>
          </div>
        )}
      </Card>
    </div>
  );
}
