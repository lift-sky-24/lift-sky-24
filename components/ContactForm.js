"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

const empty = { name: "", email: "", phone: "", details: "" };

function AnimField({ id, label, error, children }) {
  return (
    <motion.div
      className="relative mt-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <label htmlFor={id} className="text-sm font-medium text-slate-700 block mb-1">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-err`}
            className="mt-1 text-xs text-red-600"
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ContactForm() {
  const [form,      setForm]      = useState(empty);
  const [errors,    setErrors]    = useState({});
  const [status,    setStatus]    = useState("idle");
  const [serverErr, setServerErr] = useState("");

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2)          e.name    = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email))   e.email   = "Enter a valid email address.";
    if (form.phone && !/^[+\d\s\-()]{7,15}$/.test(form.phone.trim()))
                                               e.phone   = "Enter a valid phone number.";
    if (form.details.trim().length < 10)       e.details = "Tell us a little more (at least 10 characters).";
    return e;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus("sending");
    setServerErr("");

    try {
      const res  = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setServerErr(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm(empty);
    } catch {
      setServerErr("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  const inputCls = (k) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-brand focus:ring-2 focus:ring-brand/20 focus:scale-[1.01] disabled:opacity-60 ${errors[k] ? "border-red-400" : "border-slate-200"}`;

  const field = (k) => ({
    id:       k,
    name:     k,
    value:    form[k],
    disabled: status === "sending",
    onChange: (ev) => { setStatus("idle"); setForm({ ...form, [k]: ev.target.value }); },
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
    className: inputCls(k),
  });

  if (status === "success") {
    return (
      <motion.div
        className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-slate-100 bg-white p-10 shadow-card text-center"
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <motion.span
          className="grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-500"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
        >
          <CheckCircle2 size={32} />
        </motion.span>
        <motion.h3 className="text-lg font-bold text-navy-900" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          Message Received!
        </motion.h3>
        <motion.p className="text-sm text-slate-500 max-w-xs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          Thanks for reaching out. We&apos;ll get back to you within one business day.
        </motion.p>
        <motion.button
          onClick={() => setStatus("idle")}
          className="mt-2 rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 hover:border-brand hover:text-brand transition"
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
        >
          Send another message
        </motion.button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card sm:p-8">
      <AnimField id="name" label="Your Name *" error={errors.name}>
        <input type="text" autoComplete="name" placeholder="Enter your name" {...field("name")} />
      </AnimField>

      <AnimField id="email" label="Email Address *" error={errors.email}>
        <input type="email" autoComplete="email" placeholder="Enter your email" {...field("email")} />
      </AnimField>

      <AnimField id="phone" label="Phone Number" error={errors.phone}>
        <input type="tel" autoComplete="tel" placeholder="+91 98765 43210" {...field("phone")} />
      </AnimField>

      <AnimField id="details" label="Project Details *" error={errors.details}>
        <textarea rows={4} placeholder="Tell us about your project" {...field("details")} />
      </AnimField>

      <AnimatePresence>
        {status === "error" && serverErr && (
          <motion.p
            role="alert"
            className="mt-3 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600"
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          >
            {serverErr}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 active:scale-[.98] disabled:opacity-70 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {status === "sending"
          ? <><Loader2 size={16} className="animate-spin" /> Sending…</>
          : "Send Message"
        }
      </motion.button>
    </form>
  );
}
