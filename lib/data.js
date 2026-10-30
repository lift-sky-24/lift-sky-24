import {
  Monitor, Smartphone, PenTool, Cloud, Megaphone, Lightbulb, Cpu, Headset, Clock, Layers, Smile,
  Target, Eye, ShieldCheck, Users, Heart, HeartPulse, GraduationCap, ShoppingCart, Landmark, Factory,
  Building2, Plane, Truck, Brain, ScanEye, MessageSquare, TrendingUp, ShieldAlert, BarChart3, Bot,
  Wrench, Code2, Globe, Search, FlaskConical, Palette, MousePointerClick, LayoutTemplate, Apple, Boxes,
  Gauge, Lock, ShoppingBag, Network, Image as ImageIcon,
} from "lucide-react";

export const SITE = "https://www.liftsky24.com";

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services", href: "/services",
    children: [
      { label: "All Services", href: "/services" },
      { label: "Web Development", href: "/services/web-development" },
      { label: "Mobile Apps", href: "/services/mobile-apps" },
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
      { label: "AI & ML", href: "/services/ai-ml" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Industries", href: "/industries" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const services = [
  { icon: Monitor, t: "Web Development", d: "Modern, responsive websites and web applications.", href: "/services/web-development" },
  { icon: Smartphone, t: "Mobile Apps", d: "iOS and Android apps built for performance.", href: "/services/mobile-apps" },
  { icon: PenTool, t: "UI/UX Design", d: "User-friendly designs that delight and convert.", href: "/services/ui-ux-design" },
  { icon: Cloud, t: "Cloud Solutions", d: "Scalable, secure cloud infrastructure.", href: "/contact" },
  { icon: Megaphone, t: "Digital Marketing", d: "Grow your brand with data-driven campaigns.", href: "/contact" },
  { icon: Lightbulb, t: "IT Consulting", d: "Strategic technology guidance for your business.", href: "/contact" },
];

export const why = [
  { icon: Users, t: "Expert Team", d: "Skilled developers and designers." },
  { icon: Clock, t: "On-Time Delivery", d: "Projects delivered on schedule." },
  { icon: Layers, t: "Flexible Engagement", d: "Models that fit your budget." },
  { icon: Smile, t: "Client Satisfaction", d: "Support long after launch." },
];

export const processSteps = [
  { t: "Discover", d: "Understand your needs and goals." },
  { t: "Plan", d: "Define the right strategy and roadmap." },
  { t: "Build", d: "Develop with best practices and testing." },
  { t: "Launch", d: "Go live with ongoing support." },
];

export const values = [
  { icon: Lightbulb, t: "Innovation" },
  { icon: ShieldCheck, t: "Integrity" },
  { icon: Users, t: "Collaboration" },
  { icon: Heart, t: "Customer First" },
];

export const missionVision = [
  { icon: Target, t: "Our Mission", d: "To deliver innovative digital solutions that drive measurable growth and lasting value for every client." },
  { icon: Eye, t: "Our Vision", d: "To be a trusted global partner in IT services, known for quality, integrity and customer success." },
];

export const team = [
  { n: "Amit Sharma", r: "CEO & Founder" },
  { n: "Priya Singh", r: "CTO" },
  { n: "Rahul Verma", r: "Lead Developer" },
  { n: "Neha Gupta", r: "UI/UX Designer" },
  { n: "Sandeep Yadav", r: "Marketing Head" },
];

export const projects = [
  { t: "E-Commerce Platform", c: "Web Apps", img: "/images/project-1.svg" },
  { t: "Healthcare App", c: "Mobile Apps", img: "/images/project-2.svg" },
  { t: "Real Estate Website", c: "Web Apps", img: "/images/project-3.svg" },
  { t: "Travel Booking App", c: "Mobile Apps", img: "/images/project-4.svg" },
  { t: "Education Portal", c: "Software", img: "/images/project-5.svg" },
  { t: "Food Delivery App", c: "Mobile Apps", img: "/images/project-6.svg" },
  { t: "Finance Dashboard", c: "UI/UX", img: "/images/project-7.svg" },
  { t: "Portfolio Website", c: "UI/UX", img: "/images/project-8.svg" },
];

export const industries = [
  { icon: HeartPulse, t: "Healthcare", d: "Better care through secure, connected technology." },
  { icon: GraduationCap, t: "Education", d: "E-learning platforms and campus tools." },
  { icon: ShoppingCart, t: "E-Commerce", d: "Storefronts that convert and scale." },
  { icon: Landmark, t: "Finance", d: "Secure fintech and banking solutions." },
  { icon: Factory, t: "Manufacturing", d: "Smart systems for modern production." },
  { icon: Building2, t: "Real Estate", d: "Property portals and CRM tools." },
  { icon: Plane, t: "Travel & Hospitality", d: "Booking and guest-experience platforms." },
  { icon: Truck, t: "Logistics & Supply Chain", d: "Tracking and fleet management software." },
];

export const industryPoints = [
  "Domain expertise and experience",
  "Industry-specific best practices",
  "Faster time to market",
  "Better business outcomes",
];

export const plans = [
  { name: "Starter", monthly: 299, features: ["Website Development", "Basic SEO Optimization", "1 Month Support", "Responsive Design"], cta: "Get Started" },
  { name: "Business", monthly: 599, popular: true, features: ["Custom Development", "Mobile App Development", "Priority Support", "Advanced SEO"], cta: "Get Started" },
  { name: "Enterprise", custom: true, features: ["Full-Stack Solutions", "Dedicated Team", "Ongoing Support", "SLA and Security Reviews"], cta: "Contact Us" },
];

export const posts = [
  { t: "The Future of Web Development in 2026", c: "Web Development", d: "Apr 02, 2026", img: "/images/project-1.svg" },
  { t: "10 UI/UX Trends You Can't Ignore in 2026", c: "UI/UX Design", d: "Mar 28, 2026", img: "/images/project-7.svg" },
  { t: "How to Grow Your Business with Digital Marketing", c: "Digital Marketing", d: "Mar 20, 2026", img: "/images/project-4.svg" },
  { t: "Best Tools for Developers in 2026", c: "Technology", d: "Mar 12, 2026", img: "/images/project-5.svg" },
  { t: "How to Improve Website Speed and Performance", c: "Web Development", d: "Mar 04, 2026", img: "/images/project-3.svg" },
  { t: "The Complete Guide to Mobile App Development", c: "Mobile Apps", d: "Feb 26, 2026", img: "/images/project-2.svg" },
  { t: "Choosing the Right Tech Stack for Your Startup", c: "Technology", d: "Feb 18, 2026", img: "/images/project-8.svg" },
  { t: "Design Systems: Why Consistency Wins", c: "UI/UX Design", d: "Feb 10, 2026", img: "/images/project-6.svg" },
  { t: "SEO Basics Every Business Owner Should Know", c: "Digital Marketing", d: "Feb 02, 2026", img: "/images/project-1.svg" },
];
export const blogCats = ["All", "Web Development", "Mobile Apps", "UI/UX Design", "Digital Marketing", "Technology"];

export const webServices = [
  { icon: Globe, t: "Custom Websites", d: "Unique, brand-focused websites built from scratch." },
  { icon: Layers, t: "Web Application Solutions", d: "Scalable web apps tailored to your workflows." },
  { icon: ShoppingBag, t: "E-Commerce Development", d: "Stores with secure payments and smooth checkout." },
  { icon: Wrench, t: "Website Redesign & Maintenance", d: "Refresh, fix and keep your site running fast." },
];
export const webTech = ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS", "TypeScript"];
export const webProcess = [
  { t: "Plan", d: "Goals, scope and sitemap." },
  { t: "Design", d: "Wireframes and visual design." },
  { t: "Develop", d: "Clean, tested code." },
  { t: "Launch", d: "Deploy and support." },
];

export const mobileServices = [
  { icon: Apple, t: "iOS & Android App Development", d: "Native apps for both major platforms." },
  { icon: ShoppingCart, t: "E-Commerce Apps", d: "Shopping apps with fast, safe checkout." },
  { icon: Smartphone, t: "Cross-Platform Apps", d: "One codebase, two platforms, lower cost." },
  { icon: Wrench, t: "App Maintenance & Support", d: "Updates, monitoring and bug fixes." },
];
export const mobileTech = ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "AWS"];

export const designProcess = [
  { icon: Search, t: "Research", d: "Learn about users and market." },
  { icon: LayoutTemplate, t: "Wireframing", d: "Map structure and flows." },
  { icon: MousePointerClick, t: "Prototyping", d: "Interactive, testable mockups." },
  { icon: Palette, t: "UI Design", d: "Polished visual interfaces." },
  { icon: FlaskConical, t: "Testing", d: "Validate with real users." },
];
export const designTools = ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "Framer"];

export const aiServices = [
  { icon: Brain, t: "Machine Learning", d: "Models that learn from your data." },
  { icon: Network, t: "Deep Learning", d: "Neural networks for complex problems." },
  { icon: ScanEye, t: "Computer Vision", d: "Detect and understand images and video." },
  { icon: MessageSquare, t: "NLP", d: "Understand and generate human language." },
  { icon: TrendingUp, t: "Predictive Analytics", d: "Forecast trends and outcomes." },
];
export const aiUseCases = [
  { icon: Bot, t: "Chatbots" },
  { icon: Boxes, t: "Recommendation Systems" },
  { icon: ShieldAlert, t: "Fraud Detection" },
  { icon: ImageIcon, t: "Image Recognition" },
  { icon: BarChart3, t: "Data Analysis" },
];

export const allPages = [
  { t: "Home Page", d: "Hero, services, why choose us, featured projects.", href: "/" },
  { t: "About Us Page", d: "Mission, values and team.", href: "/about" },
  { t: "Services Page", d: "All services and our process.", href: "/services" },
  { t: "Portfolio Page", d: "Filterable project showcase.", href: "/portfolio" },
  { t: "Industries Page", d: "Solutions for every industry.", href: "/industries" },
  { t: "Pricing Page", d: "Simple, transparent plans.", href: "/pricing" },
  { t: "Blog / Resources Page", d: "Insights, guides and news.", href: "/blog" },
  { t: "Contact Page", d: "Form, details and map.", href: "/contact" },
  { t: "Web Development Page", d: "Websites that drive results.", href: "/services/web-development" },
  { t: "Mobile Apps Page", d: "Apps that make an impact.", href: "/services/mobile-apps" },
  { t: "UI/UX Design Page", d: "Beautiful, usable design.", href: "/services/ui-ux-design" },
  { t: "AI & ML Page", d: "Smarter solutions with AI.", href: "/services/ai-ml" },
];

export const footerIndustries = ["Healthcare", "Education", "E-Commerce", "Finance", "Real Estate", "Travel & Hospitality"];
