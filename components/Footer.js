"use client";
import { useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Rocket } from "lucide-react";
import { nav, footerIndustries } from "@/lib/data";

const social = [{ i: Facebook, n: "Facebook" }, { i: Twitter, n: "Twitter" }, { i: Linkedin, n: "LinkedIn" }, { i: Instagram, n: "Instagram" }];
const quick = [...nav.map((n) => ({ label: n.label, href: n.href })), { label: "Pricing", href: "/pricing" }];
const svc = [
  { label: "Web Development", href: "/services/web-development" },
  { label: "Mobile Apps", href: "/services/mobile-apps" },
  { label: "UI/UX Design", href: "/services/ui-ux-design" },
  { label: "AI & ML", href: "/services/ai-ml" },
  { label: "Cloud Solutions", href: "/services" },
  { label: "Digital Marketing", href: "/services" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState({ ok: false, text: "" });
  const subscribe = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setMsg({ ok: false, text: "Enter a valid email address." });
    setMsg({ ok: true, text: "You're subscribed. Welcome aboard!" });
    setEmail("");
  };
  const Col = ({ h, items }) => (
    <nav aria-label={h}>
      <h3 className="font-semibold text-white">{h}</h3>
      <ul className="mt-4 space-y-2 text-sm">{items.map((x) => (<li key={x.label}><Link href={x.href} className="transition hover:text-white">{x.label}</Link></li>))}</ul>
    </nav>
  );
  return (
    <footer className="bg-navy-900 text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient"><Rocket size={16} /></span> LiftSky24
          </Link>
          <p className="mt-4 text-sm leading-relaxed">Web, mobile, design and AI solutions that help ambitious businesses grow.</p>
        </div>
        <Col h="Quick Links" items={quick} />
        <Col h="Services" items={svc} />
        <Col h="Industries" items={footerIndustries.map((x) => ({ label: x, href: "/industries" }))} />
        <div>
          <h3 className="font-semibold text-white">Stay Connected</h3>
          <ul className="mt-4 flex gap-2">
            {social.map((s) => (<li key={s.n}><a href="#" aria-label={s.n} className="grid h-8 w-8 place-items-center rounded-full bg-white/10 transition hover:bg-brand-gradient"><s.i size={14} /></a></li>))}
          </ul>
          <p className="mt-5 text-sm">Subscribe to our newsletter</p>
          <form onSubmit={subscribe} noValidate className="mt-2 flex gap-2">
            <label htmlFor="newsletter" className="sr-only">Email address</label>
            <input id="newsletter" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="min-w-0 flex-1 rounded-full bg-white/10 px-4 py-2 text-sm text-white outline-none placeholder:text-white/50 focus:ring-2 focus:ring-brand-pink" />
            <button className="rounded-full bg-brand-gradient px-4 py-2 text-sm font-semibold text-white hover:brightness-110">Subscribe</button>
          </form>
          <p role="status" aria-live="polite" className={`mt-2 min-h-5 text-xs ${msg.ok ? "text-emerald-300" : "text-pink-300"}`}>{msg.text}</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} LiftSky24. All rights reserved.</p>
          <p className="flex gap-4"><Link href="/contact" className="hover:text-white">Privacy Policy</Link><Link href="/contact" className="hover:text-white">Terms & Conditions</Link></p>
        </div>
      </div>
    </footer>
  );
}
