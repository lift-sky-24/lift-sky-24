"use client";
import { useState } from "react";
import { Mail, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { Reveal } from "./ui";

const empty = { name: "", email: "", details: "" };

export default function CTA() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (form.details.trim().length < 10) e.details = "Tell us a little more (at least 10 characters).";
    return e;
  };
  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) { setSent(true); setForm(empty); }
  };
  const field = (k) => ({
    id: k, name: k, value: form[k],
    onChange: (ev) => { setSent(false); setForm({ ...form, [k]: ev.target.value }); },
    "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined,
    className: `mt-1 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 ${errors[k] ? "border-red-400" : "border-slate-200"}`,
  });

  return (
    <section id="contact" className="scroll-mt-20 px-4 pb-20 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mx-auto grid max-w-7xl gap-10 rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-brand-violet p-8 text-white sm:p-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Have a Project in Mind?</h2>
            <p className="mt-3 max-w-md text-white/75">Tell us what you want to build. We reply within one business day with next steps.</p>
            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-center gap-3"><MapPin size={18} className="text-pink-300" /> Jaipur, Rajasthan, India</li>
              <li className="flex items-center gap-3"><Mail size={18} className="text-pink-300" /><a href="mailto:hello@liftsky24.com" className="hover:underline">hello@liftsky24.com</a></li>
              <li className="flex items-center gap-3"><Phone size={18} className="text-pink-300" /><a href="tel:+919876543210" className="hover:underline">+91 98765 43210</a></li>
            </ul>
          </div>
          <form onSubmit={onSubmit} noValidate className="rounded-2xl bg-white p-6 text-ink">
            <label htmlFor="name" className="text-sm font-medium">Your name</label>
            <input type="text" autoComplete="name" {...field("name")} />
            {errors.name && <p id="name-err" className="mt-1 text-xs text-red-600">{errors.name}</p>}
            <label htmlFor="email" className="mt-4 block text-sm font-medium">Email address</label>
            <input type="email" autoComplete="email" {...field("email")} />
            {errors.email && <p id="email-err" className="mt-1 text-xs text-red-600">{errors.email}</p>}
            <label htmlFor="details" className="mt-4 block text-sm font-medium">Project details</label>
            <textarea rows={4} {...field("details")} />
            {errors.details && <p id="details-err" className="mt-1 text-xs text-red-600">{errors.details}</p>}
            <button type="submit" className="mt-5 w-full rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 active:scale-[.98]">Send message</button>
            <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm text-emerald-600">
              {sent && (<span className="flex items-center gap-2"><CheckCircle2 size={16} /> Thanks! Your message is ready. We will get back to you soon.</span>)}
            </p>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
