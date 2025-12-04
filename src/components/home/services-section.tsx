"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import Image from "next/image";
import { formatPrice } from "@/lib/format";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string | null;
}

interface ServicesSectionProps {
  services: Service[] | null;
  showSearch?: boolean;
}

export default function ServicesSection({ services, showSearch = true }: ServicesSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredServices = services?.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="services" className="w-full py-8 md:py-16 lg:py-20 relative">
      {/* Entertainment-themed section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>

      <div className="container px-4 md:px-6 relative z-10 mx-auto">
        <div className="text-center mb-8 md:mb-12 space-y-4">
          <div className="space-y-2 md:space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Nuestros Servicios
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
              Soluciones digitales de alta calidad diseñadas para impulsar tu éxito
            </p>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="max-w-md mx-auto relative">
              <div className="relative z-50">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Buscar servicios..."
                  className="pl-10 bg-black/50 backdrop-blur-md border-white/20 text-white placeholder:text-slate-400 focus-visible:ring-amber-500"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />

                {/* Suggestions Dropdown */}
                {showSuggestions && searchTerm.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg shadow-xl overflow-hidden">
                    {filteredServices && filteredServices.length > 0 ? (
                      <ul className="py-1">
                        {filteredServices.slice(0, 5).map((service) => (
                          <li key={service.id}>
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
                              onClick={() => {
                                setSearchTerm(service.title);
                                setShowSuggestions(false);
                              }}
                            >
                              <Search className="w-3 h-3 text-slate-500" />
                              {service.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="px-4 py-3 text-sm text-slate-500 text-center">
                        No se encontraron resultados
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-7xl mx-auto">
          {filteredServices?.length === 0 ? (
            <div className="text-center text-slate-400 py-10">
              No se encontraron servicios que coincidan con tu búsqueda.
            </div>
          ) : (
            filteredServices?.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="block w-full sm:w-[260px]"
              >
                <Card className="group overflow-hidden bg-white border border-slate-200 hover:border-orange-300 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20 h-full cursor-pointer">
                  <div className="relative overflow-hidden aspect-video">
                    <Image
                      src={service.image_url || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      quality={75}
                    />
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                      ${formatPrice(service.price)}
                    </div>
                  </div>
                  <CardHeader className="pb-1 px-3 pt-2">
                    <CardTitle className="text-base text-slate-900 group-hover:text-orange-500 transition-colors line-clamp-1">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 pb-2">
                    <p className="text-slate-600 line-clamp-2 text-xs">
                      {service.description}
                    </p>
                  </CardContent>
                  <CardFooter className="px-3 pb-3 pt-0">
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 group-hover:scale-105 transition-all shadow-md text-xs h-8">
                      Ver Detalles{" "}
                      <ArrowRight className="ml-1.5 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
