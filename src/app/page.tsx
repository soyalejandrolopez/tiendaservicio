import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { formatPrice } from "@/lib/format";

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
    .limit(6);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-8 md:py-16 lg:py-20 xl:py-28 relative text-white">
        {/* Entertainment overlay - more subtle */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
            <div className="space-y-3">
              <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none">
                Servicios Digitales Premium
              </h1>
              <p className="text-base text-gray-400 md:text-lg">
                Desbloquea tu potencial con nuestra selección de servicios profesionales. Rápidos, confiables y seguros.
              </p>
              <div className="pt-3">
                <Link href="#services">
                  <Button className="bg-white text-black hover:bg-gray-200">
                    Ver Servicios
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/digital-services.jpg"
                alt="Servicios Digitales Premium"
                className="rounded-xl shadow-2xl w-full max-w-md h-auto"
                width={500}
                height={333}
                priority
                quality={85}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="w-full py-8 md:py-16 lg:py-20 relative">
        {/* Entertainment-themed section background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center mb-8 md:mb-12 space-y-2 md:space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Nuestros Servicios
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
              Soluciones digitales de alta calidad diseñadas para impulsar tu éxito
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {services?.map((service) => (
              <Link key={service.id} href={`/services/${service.id}`}>
                <Card className="group overflow-hidden bg-white border border-slate-200 hover:border-orange-300 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 h-full cursor-pointer">
                  <div className="relative overflow-hidden aspect-video">
                    <Image
                      src={service.image_url || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      quality={75}
                    />
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-base font-bold shadow-lg">
                      ${formatPrice(service.price)}
                    </div>
                  </div>
                  <CardHeader className="pb-2 px-4 pt-3">
                    <CardTitle className="text-lg text-slate-900 group-hover:text-orange-500 transition-colors">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-3">
                    <p className="text-slate-600 line-clamp-2 text-sm">{service.description}</p>
                  </CardContent>
                  <CardFooter className="px-4 pb-4 pt-0">
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 group-hover:scale-105 transition-all shadow-lg text-sm py-2">
                      Ver Detalles <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
