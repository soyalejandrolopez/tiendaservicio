import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import EditServiceWithUpload from "@/components/admin/edit-service-image";

export default async function EditServicePage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  
  if (!id) {
    notFound();
  }

  const supabase = await createClient();

  const { data: service, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !service) {
    console.error("Error fetching service:", error);
    notFound();
  }

  return (
    <EditServiceWithUpload service={service} />
  );
}