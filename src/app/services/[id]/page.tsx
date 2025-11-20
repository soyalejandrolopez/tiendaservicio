import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import WompiButton from "@/components/wompi-button";

export const dynamic = 'force-dynamic';
export const revalidate = 60;

interface ServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: service } = await supabase
    .from("services")
    .select("id, title, description, price, image_url")
    .eq("id", id)
    .single();

  if (!service) {
    notFound();
  }

  const averageRating = 4.8;
  const reviewCount = 156;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container py-4 md:py-8 max-w-5xl mx-auto">
        <Link href="/" className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-4 md:mb-6 transition-colors text-sm font-medium">
          &larr; Volver
        </Link>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl shadow-xl w-full aspect-square">
              <Image
                src={service.image_url || "/placeholder.svg"}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={75}
                priority
                className="object-cover"
              />
            </div>

            <Card className="border-slate-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Acerca de este servicio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 text-sm leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="border-slate-200">
              <CardHeader className="pb-3">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{service.title}</h1>
                <div className="flex items-center gap-2 pt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-slate-600">{averageRating} ({reviewCount} reseñas)</span>
                </div>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-red-600 border-0 shadow-xl">
              <CardContent className="pt-6 pb-6 space-y-4">
                <div className="text-center">
                  <p className="text-xs text-orange-100 mb-1 uppercase tracking-wide">Precio</p>
                  <span className="text-5xl md:text-6xl font-bold text-white">${service.price}</span>
                </div>
                <WompiButton price={Number(service.price)} title={service.title} />
              </CardContent>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Incluye</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">✓</span>
                    <span>Entrega profesional</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">✓</span>
                    <span>Garantía de calidad</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">✓</span>
                    <span>Soporte 24/7</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500">✓</span>
                    <span>Consulta de seguimiento</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}