"use client";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { socialMediaData as data } from "@/data/service-details/social-media-management";

export default function SocialMediaPage({ breadcrumb = [] }) {
  return <ServicePageTemplate data={data} breadcrumb={breadcrumb} slug="social-media-management" />;
}
