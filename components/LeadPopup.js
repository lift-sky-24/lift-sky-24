"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2 } from "lucide-react";

const STORAGE_KEY = "ls24_popup_dismissed";
const DELAY_MS    = 30000; // show after 30 seconds
const RESHOW_DAYS = 7;     // don't show again for 7 days after dismiss

const empty = { name: "", phone: "", email: "" };

export default function LeadPopup() {
  const [visible, setVisible] = useState(false);
  const [form,    setForm]    = useState(empty);
  const [errors,  setErrors]  = useState({});
  const [status,  setStatus]  = useState("idle");

  const dismiss = useCallback((permanent = false) => {
    setVisible(false);
    if (permanent) {
      const until = Date.now() + RESHOW_DAYS * 24 * 60 * 60 * 1000;
      try { localStorage.setItem(STORAGE_KEY, String(until)); } catch {}
    }
  }, []);

  useEffect(() => {
    // Don't show if dismissed recently
    try {
      const until = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
      if (Date.now() < until) return;
    } catch {}

    // Timer-based trigger
    const timer = setTimeout(() => setVisible(true), DELAY_MS);

    // Exit-intent trigger (mouse leaves viewport from top)
    const onMouseLeave = (e) => {
      if (e.clientY <= 0) {
        clearTimeout(timer);
        setVisible(true);
      }
    };
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!visible) return;
    const onKey = (e) => { if (e.key === "Escape") dismiss(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible, dismiss]);

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2)
      e.name = "Please enter your name.";
    if (!form.phone.trim() && !form.email.trim())
      e.phone = "Enter a phone number or email.";
    if (form.phone && !/^[+\d\s\-()]{7,15}$/.test(form.phone.trim()))
      e.phone = "Enter a valid phone number.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Enter a valid email.";
    return e;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus("sending");
    try {
      const res  = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          name:    form.name,
          email:   form.email || "not provided",
          phone:   form.phone,
          details: `Quick enquiry via popup — Phone: ${form.phone || "—"}, Email: ${form.email || "—"}`,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) { setStatus("error"); return; }
      setStatus("success");
      dismiss(true);
    } catch {
      setStatus("error");
    }
  };

  const inp = (k, placeholder, type = "text") => ({
    id:         `popup-${k}`,
    type,
    autoComplete: type === "email" ? "email" : type === "tel" ? "tel" : "name",
    placeholder,
    value:      form[k],
    disabled:   status === "sending",
    onChange:   (ev) => { setErrors({}); setForm({ ...form, [k]: ev.target.value }); },
    style: {
      width: "100%", boxSizing: "border-box",
      padding: "10px 14px", borderRadius: 12,
      border: `1.5px solid ${errors[k] ? "#f87171" : "rgba(16,17,26,.12)"}`,
      fontSize: 13, outline: "none", background: "#fafafa",
      color: "#10111a",
    },
  });

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dismiss(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(10,10,20,.55)",
              backdropFilter: "blur(3px)",
              zIndex: 9998,
            }}
            aria-hidden="true"
          />

          {/* Centering wrapper — fixed full-screen flex, pointer-events only on the modal */}
          <div
            style={{
              position: "fixed", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 9999,
              pointerEvents: "none",
              padding: "16px",
            }}
          >
          {/* Modal */}
          <motion.div
            key="popup"
            role="dialog"
            aria-modal="true"
            aria-label="Quick enquiry"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            style={{
              position:     "relative",
              pointerEvents:"all",
              width:        "min(92vw, 440px)",
              maxHeight:    "90vh",
              overflowY:    "auto",
              background:   "#fff",
              borderRadius: 28,
              boxShadow:    "0 32px 80px rgba(10,10,20,.28)",
            }}
          >
            {/* Orange top accent */}
            <div style={{ height: 4, background: "linear-gradient(90deg,#FF8A1F,#FC6E04,#E04F00)" }} />

            <div style={{ padding: "28px 28px 24px" }}>
              {/* Close */}
              <button
                onClick={() => dismiss(false)}
                aria-label="Close"
                style={{
                  position: "absolute", top: 16, right: 16,
                  background: "rgba(16,17,26,.06)", border: "none",
                  borderRadius: "50%", width: 32, height: 32,
                  display: "grid", placeItems: "center",
                  cursor: "pointer", color: "#747684",
                }}
              >
                <X size={16} />
              </button>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: "center", padding: "20px 0" }}
                >
                  <span style={{
                    display: "inline-grid", placeItems: "center",
                    width: 60, height: 60, borderRadius: "50%",
                    background: "#f0fdf4", color: "#22c55e", marginBottom: 16,
                  }}>
                    <CheckCircle2 size={30} />
                  </span>
                  <p style={{ fontWeight: 800, fontSize: 18, color: "#10111a", marginBottom: 6 }}>Got it!</p>
                  <p style={{ fontSize: 13, color: "#747684" }}>We&apos;ll reach out to you very soon.</p>
                </motion.div>
              ) : (
                <>
                  {/* Eyebrow */}
                  <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: "1.4px", textTransform: "uppercase", color: "#FC6E04", marginBottom: 8 }}>
                    Free Consultation
                  </p>

                  <h2 style={{ fontSize: 20, fontWeight: 900, color: "#10111a", lineHeight: 1.2, marginBottom: 6 }}>
                    Get a Free Quote<br />in 24 Hours
                  </h2>
                  <p style={{ fontSize: 13, color: "#747684", marginBottom: 20, lineHeight: 1.6 }}>
                    Share your number or email — we&apos;ll call you back with a no-obligation quote.
                  </p>

                  <form onSubmit={onSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div>
                      <label htmlFor="popup-name" style={{ fontSize: 11, fontWeight: 700, color: "#475569", display: "block", marginBottom: 4 }}>Your Name *</label>
                      <input {...inp("name", "Enter your name")} />
                      {errors.name && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 3 }}>{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="popup-phone" style={{ fontSize: 11, fontWeight: 700, color: "#475569", display: "block", marginBottom: 4 }}>Phone Number</label>
                      <input {...inp("phone", "+91 98765 43210", "tel")} />
                      {errors.phone && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 3 }}>{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="popup-email" style={{ fontSize: 11, fontWeight: 700, color: "#475569", display: "block", marginBottom: 4 }}>Email Address</label>
                      <input {...inp("email", "your@email.com", "email")} />
                      {errors.email && <p style={{ fontSize: 11, color: "#ef4444", marginTop: 3 }}>{errors.email}</p>}
                    </div>

                    {status === "error" && (
                      <p style={{ fontSize: 12, color: "#ef4444", background: "#fef2f2", padding: "8px 12px", borderRadius: 8 }}>
                        Something went wrong. Please try again.
                      </p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        marginTop: 4,
                        width: "100%", padding: "13px", borderRadius: 99,
                        background: "linear-gradient(110deg,#FF8A1F,#FC6E04,#E04F00)",
                        color: "#0C1323", fontWeight: 800, fontSize: 14,
                        border: "none", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        opacity: status === "sending" ? 0.7 : 1,
                      }}
                    >
                      {status === "sending"
                        ? <><Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} /> Sending…</>
                        : "Request Free Quote →"
                      }
                    </motion.button>

                    <button
                      type="button"
                      onClick={() => dismiss(true)}
                      style={{ background: "none", border: "none", fontSize: 12, color: "#94a3b8", cursor: "pointer", marginTop: 2 }}
                    >
                      No thanks, I&apos;ll look around first
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
          </div>  {/* /centering wrapper */}
        </>
      )}
    </AnimatePresence>
  );
}
