import { createClient } from "@/utils/supabase/server";

import HeroSection from "@/components/home/hero-section";
import ServicesSection from "@/components/home/services-section";

// Remove force-dynamic to allow static generation with revalidation
export const revalidate = 300; // Revalidate every 5 minutes instead of every request

export default async function LandingPage() {
  const supabase = await createClient();

  // Only fetch essential fields and limit to 6 services for homepage
  const { data: services } = await supabase
    .from("services")
    .select("id, title, description, price, image_url")
    .eq("active", true)
    .order('created_at', { ascending: false })
    .order('created_at', { ascending: false });

  return (
    <div className="flex flex-col min-h-screen">
      <ServicesSection services={services} showSearch={false} />
      <HeroSection />
    </div>
  );
}
