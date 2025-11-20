import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit, ArrowLeft } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ViewServicePage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const supabase = await createClient();

  const { data: service, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !service) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-4">
        <Link href="/admin/services">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Servicios
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {service.image_url && (
          <div className="h-64 bg-gray-200">
            <img 
              src={service.image_url} 
              alt={service.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-gray-900">{service.title}</h1>
            <Link href={`/admin/services/${service.id}/edit`}>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-gray-600">{service.description}</p>
          <div className="mt-6">
            <p className="text-2xl font-bold text-blue-600">${service.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}