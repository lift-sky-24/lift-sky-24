"use client";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const empty = { name: "", email: "", details: "" };

export default function ContactForm() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (form.details.trim().length < 10) e.details = "Tell us a little more (at least 10 characters).";
    setErrors(e);
    if (!Object.keys(e).length) { setSent(true); setForm(empty); }
  };
  const field = (k) => ({
    id: k, name: k, value: form[k],
    onChange: (ev) => { setSent(false); setForm({ ...form, [k]: ev.target.value }); },
    "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined,
    className: `mt-1 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 ${errors[k] ? "border-red-400" : "border-slate-200"}`,
  });
  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card sm:p-8">
      <label htmlFor="name" className="text-sm font-medium">Your Name *</label>
      <input type="text" autoComplete="name" placeholder="Enter your name" {...field("name")} />
      {errors.name && <p id="name-err" className="mt-1 text-xs text-red-600">{errors.name}</p>}
      <label htmlFor="email" className="mt-4 block text-sm font-medium">Email Address *</label>
      <input type="email" autoComplete="email" placeholder="Enter your email" {...field("email")} />
      {errors.email && <p id="email-err" className="mt-1 text-xs text-red-600">{errors.email}</p>}
      <label htmlFor="details" className="mt-4 block text-sm font-medium">Project Details *</label>
      <textarea rows={4} placeholder="Tell us about your project" {...field("details")} />
      {errors.details && <p id="details-err" className="mt-1 text-xs text-red-600">{errors.details}</p>}
      <button type="submit" className="mt-5 w-full rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 active:scale-[.98]">Send Message</button>
      <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm text-emerald-600">
        {sent && <span className="flex items-center gap-2"><CheckCircle2 size={16} /> Thanks! Your message is ready. We will get back to you soon.</span>}
      </p>
    </form>
  );
}
