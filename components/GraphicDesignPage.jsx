"use client";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { graphicDesignData as data } from "@/data/service-details/graphic-design";

export default function GraphicDesignPage({ breadcrumb = [] }) {
  return <ServicePageTemplate data={data} breadcrumb={breadcrumb} slug="graphic-design" />;
}
