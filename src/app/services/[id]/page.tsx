import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, Star, Shield, Clock, Award } from "lucide-react";
import WompiButton from "@/components/wompi-button";
import { formatPrice } from "@/lib/format";

export const revalidate = 300;

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
    <div className="min-h-screen py-8 md:py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <Link
          href="/services"
          className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors text-sm font-medium group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver a Servicios
        </Link>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image & Description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[2/1] border border-white/10 group">
              <Image
                src={service.image_url || "/placeholder.svg"}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                quality={85}
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
            </div>

            <Card className="bg-black/40 backdrop-blur-md border-white/10 text-white overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-playfair font-bold mb-4 text-white">Acerca del Servicio</h2>
                <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                  {service.description}
                </p>

                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
                  <div className="text-center space-y-2">
                    <div className="w-10 h-10 mx-auto bg-amber-500/20 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-amber-500" />
                    </div>
                    <p className="text-xs text-slate-400 font-medium">Garantía Total</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-10 h-10 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-500" />
                    </div>
                    <p className="text-xs text-slate-400 font-medium">Entrega Rápida</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-10 h-10 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-xs text-slate-400 font-medium">Calidad Premium</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Title, Price, Action */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <Card className="bg-black/60 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"></div>
              <CardContent className="p-6 md:p-8 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-medium border border-white/10 backdrop-blur-sm">
                      Servicio Digital
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-bold">{averageRating}</span>
                      <span className="text-xs text-slate-400">({reviewCount})</span>
                    </div>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-playfair font-bold text-white leading-tight">
                    {service.title}
                  </h1>
                </div>

                <div className="flex items-baseline gap-2 pb-6 border-b border-white/10">
                  <span className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                    ${formatPrice(service.price)}
                  </span>
                  <span className="text-slate-400 text-xs">COP</span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-medium text-slate-300 uppercase tracking-wider">Lo que incluye:</h3>
                  <ul className="space-y-3">
                    {[
                      "Entrega profesional garantizada",
                      "Soporte técnico prioritario 24/7",
                      "Revisiones ilimitadas",
                      "Certificado de autenticidad"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-slate-200">
                        <div className="mt-0.5 w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-green-500" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <Link href={`/checkout?serviceId=${service.id}`} className="block w-full">
                    <Button
                      className="w-full h-14 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      Comprar Ahora
                    </Button>
                  </Link>
                  <p className="text-center text-xs text-slate-500 mt-4">
                    Pago 100% seguro procesado por Wompi
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}