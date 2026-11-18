"use client";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { appDevelopmentData as data } from "@/data/service-details/app-development";

export default function AppDevelopmentPage({ breadcrumb = [] }) {
  return <ServicePageTemplate data={data} breadcrumb={breadcrumb} slug="app-development" />;
}
