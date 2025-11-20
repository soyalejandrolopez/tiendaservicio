import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/format";

export const revalidate = 300;

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from("services")
    .select("id, title, description, price, image_url")
    .eq("active", true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container py-8 md:py-16 px-4">
        <div className="mb-8 md:mb-16 text-center space-y-2 md:space-y-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">Nuestros Servicios</h1>
          <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto">
            Soluciones digitales de alta calidad diseñadas para impulsar tu éxito
          </p>
        </div>

        {services && services.length > 0 ? (
          <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {services.map((service) => (
              <Link key={service.id} href={`/services/${service.id}`}>
                <Card className="group overflow-hidden bg-white border border-slate-200 hover:border-orange-300 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 flex flex-col h-full cursor-pointer">
                  <div className="relative overflow-hidden aspect-video">
                    <Image
                      src={service.image_url || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={75}
                      priority
                      className="object-cover w-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-base md:text-lg font-bold shadow-lg">
                      ${formatPrice(service.price)}
                    </div>
                  </div>
                  <CardHeader className="pb-2 md:pb-3 px-4 pt-4">
                    <CardTitle className="text-lg md:text-xl text-slate-900 group-hover:text-orange-500 transition-colors">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 pb-3 md:pb-4 px-4">
                    <p className="text-slate-600 line-clamp-2 md:line-clamp-3 text-xs md:text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0 px-4 pb-4">
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 group-hover:scale-105 transition-all shadow-lg text-sm md:text-base py-2 md:py-3">
                      Ver Detalles <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="max-w-md mx-auto">
            <CardContent className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">No Hay Servicios Disponibles</h2>
              <p className="text-muted-foreground mb-6">
                No tenemos ningún servicio listado en este momento. Por favor, vuelve más tarde.
              </p>
              <Link href="/">
                <Button>Volver al Inicio</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}