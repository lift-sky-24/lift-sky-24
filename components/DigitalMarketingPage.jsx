"use client";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { digitalMarketingData as data } from "@/data/service-details/digital-marketing";

export default function DigitalMarketingPage({ breadcrumb = [] }) {
  return <ServicePageTemplate data={data} breadcrumb={breadcrumb} />;
}
