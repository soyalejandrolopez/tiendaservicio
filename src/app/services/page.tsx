import { createClient } from "@/utils/supabase/server";
import ServicesSection from "@/components/home/services-section";

export const revalidate = 300;

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from("services")
    .select("id, title, description, price, image_url")
    .eq("active", true)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen pt-20">
      <ServicesSection services={services} showSearch={true} />
    </div>
  );
}