import AiAgentsPage from "@/components/AiAgentsPage";
import { meta, faqSchema, serviceSchema } from "@/lib/seo";
import { aiAgentsData } from "@/data/service-details/ai-agents";

export const metadata = meta(
  "AI Agent Development Services in Jaipur | LiftSky24",
  "Build intelligent AI agents with LiftSky24. Get AI chatbots, business automation, customer support agents and custom AI solutions in Jaipur.",
  "/services/ai-agents"
);

export default function AiAgentsService() {
  const faqs = aiAgentsData.faqs.map((f) => ({ q: f.question, a: f.answer }));
  const breadcrumb = [
    { name: "Home",       href: "/" },
    { name: "Services",   href: "/services" },
    { name: "AI Agents",  href: "/services/ai-agents" },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema({ name:"AI Agents", desc:"AI agent development and business automation services in Jaipur", href:"/services/ai-agents" })) }} />
      <AiAgentsPage breadcrumb={breadcrumb} />
    </>
  );
}
