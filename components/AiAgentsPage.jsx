"use client";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { aiAgentsData as data } from "@/data/service-details/ai-agents";

export default function AiAgentsPage({ breadcrumb = [] }) {
  return <ServicePageTemplate data={data} breadcrumb={breadcrumb} />;
}
