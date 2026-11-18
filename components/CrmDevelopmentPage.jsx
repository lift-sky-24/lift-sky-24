"use client";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { crmDevelopmentData as data } from "@/data/service-details/crm-development";

export default function CrmDevelopmentPage({ breadcrumb = [] }) {
  return <ServicePageTemplate data={data} breadcrumb={breadcrumb} slug="crm-development" />;
}
