"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { useState } from "react";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string | null;
}

interface ServicesGridProps {
  services: Service[] | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export default function ServicesGrid({ services }: ServicesGridProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = services?.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8 md:py-16">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center space-y-4"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium"
          >
            Catálogo Completo
          </motion.span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Nuestros{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Servicios
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Soluciones digitales de alta calidad diseñadas para impulsar tu éxito
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Buscar servicios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>
        </motion.div>

        {/* Services Grid */}
        {filteredServices && filteredServices.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
          >
            {filteredServices.map((service) => (
              <motion.div key={service.id} variants={itemVariants}>
                <Link href={`/services/${service.id}`} className="block h-full">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="h-full"
                  >
                    <Card className="group overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-500/50 transition-all duration-500 h-full cursor-pointer hover:shadow-2xl hover:shadow-amber-500/10">
                      <div className="relative overflow-hidden aspect-video">
                        <Image
                          src={service.image_url || "/placeholder.svg"}
                          alt={service.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          quality={80}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                        <motion.div
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg shadow-amber-500/30"
                        >
                          ${formatPrice(service.price)}
                        </motion.div>
                      </div>

                      <CardHeader className="pb-2 px-5 pt-5">
                        <CardTitle className="text-xl text-white group-hover:text-amber-400 transition-colors duration-300">
                          {service.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="px-5 pb-4 flex-1">
                        <p className="text-white/60 line-clamp-2 text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </CardContent>

                      <CardFooter className="px-5 pb-5 pt-0">
                        <Button className="w-full bg-white/10 hover:bg-amber-500 text-white border border-white/20 hover:border-amber-500 group-hover:bg-amber-500 group-hover:border-amber-500 transition-all duration-300 font-semibold">
                          Ver Detalles
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="max-w-md mx-auto bg-white/5 backdrop-blur-md border border-white/10">
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Search className="w-8 h-8 text-amber-400" />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-white">
                  {searchTerm ? "Sin Resultados" : "No Hay Servicios"}
                </h2>
                <p className="text-white/60 mb-6">
                  {searchTerm
                    ? `No encontramos servicios que coincidan con "${searchTerm}"`
                    : "No tenemos servicios disponibles en este momento."}
                </p>
                {searchTerm && (
                  <Button
                    onClick={() => setSearchTerm("")}
                    variant="outline"
                    className="bg-transparent border-white/20 text-white hover:bg-white/10"
                  >
                    Limpiar Búsqueda
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
