"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  },
};

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="w-full py-20 md:py-28 relative">
      {/* Section Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/5 to-transparent" />

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 space-y-4"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium"
          >
            Nuestros Servicios
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Soluciones que{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Transforman
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Descubre nuestra selección de servicios digitales diseñados para impulsar tu éxito
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
        >
          {services?.map((service, index) => (
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
                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                      {/* Price Badge */}
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

                    <CardContent className="px-5 pb-4">
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

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-base font-semibold bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              Ver Todos los Servicios
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
