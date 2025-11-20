import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function LandingPage() {
  const supabase = await createClient();
  const { data: services } = await supabase.from("services").select("*").eq("active", true);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black/50 backdrop-blur-sm text-white">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Servicios Digitales Premium
              </h1>
              <p className="text-lg text-gray-400 md:text-xl">
                Desbloquea tu potencial con nuestra selección de servicios profesionales. Rápidos, confiables y seguros.
              </p>
              <div className="pt-4">
                <Link href="#services">
                  <Button className="bg-white text-black hover:bg-gray-200">
                    Ver Servicios
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/digital-services.jpg"
                alt="Servicios Digitales Premium"
                className="rounded-xl shadow-2xl w-full max-w-lg h-auto"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="w-full py-12 md:py-24 lg:py-32 relative" style={{backgroundImage: "url('/background-digital.jpg')", backgroundSize: "cover", backgroundPosition: "center"}}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
              Nuestros Servicios
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Soluciones digitales de alta calidad diseñadas para impulsar tu éxito
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {services?.map((service) => (
              <Link key={service.id} href={`/services/${service.id}`}>
                <Card className="group overflow-hidden bg-white border border-slate-200 hover:border-orange-300 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 h-full cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img
                      src={service.image_url || "/placeholder.svg"}
                      alt={service.title}
                      className="aspect-video object-cover w-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                      ${service.price}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-900 group-hover:text-orange-500 transition-colors">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 line-clamp-2 text-sm">{service.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 group-hover:scale-105 transition-all shadow-lg">
                      Ver Detalles <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
