"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Check, Shield, Zap, Clock, Headphones } from "lucide-react";
import WompiButton from "@/components/wompi-button";
import { formatPrice } from "@/lib/format";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string | null;
}

interface ServiceDetailProps {
  service: Service;
}

const features = [
  { icon: Zap, text: "Entrega rápida y profesional" },
  { icon: Shield, text: "Garantía de calidad asegurada" },
  { icon: Headphones, text: "Soporte 24/7 disponible" },
  { icon: Clock, text: "Consulta de seguimiento incluida" },
];

export default function ServiceDetail({ service }: ServiceDetailProps) {
  const averageRating = 4.8;
  const reviewCount = 156;

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container max-w-6xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-white/60 hover:text-amber-400 mb-8 transition-colors text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver a Servicios
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="space-y-6"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-amber-500/10 group">
              <div className="aspect-square relative">
                <Image
                  src={service.image_url || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>
            </div>

            {/* Description Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-white/5 backdrop-blur-md border border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-white">Descripción del Servicio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="space-y-6"
          >
            {/* Title & Rating */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-white"
              >
                {service.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-3"
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(averageRating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-white/20"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-white/60">
                  {averageRating} ({reviewCount} reseñas)
                </span>
              </motion.div>
            </div>

            {/* Price Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-amber-500 to-orange-600 border-0 shadow-2xl shadow-amber-500/30 overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30" />
                <CardContent className="pt-8 pb-8 space-y-6 relative">
                  <div className="text-center">
                    <p className="text-xs text-white/80 mb-2 uppercase tracking-widest font-medium">
                      Precio del Servicio
                    </p>
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                      className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg"
                    >
                      ${formatPrice(service.price)}
                    </motion.span>
                    <p className="text-xs text-white/60 mt-2">COP - Pago único</p>
                  </div>
                  <WompiButton price={Number(service.price)} title={service.title} serviceId={service.id} />
                </CardContent>
              </Card>
            </motion.div>

            {/* Features Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="bg-amber-500/5 backdrop-blur-md border border-amber-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <Check className="w-5 h-5 text-amber-400" />
                    Incluye con tu compra
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-4 h-4 text-amber-400" />
                        </div>
                        <span className="text-white/80 text-sm">{feature.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center justify-center gap-4 py-4 px-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <Shield className="w-6 h-6 text-green-400" />
              <div className="text-center">
                <p className="text-white/80 text-sm font-medium">Pago 100% Seguro</p>
                <p className="text-white/50 text-xs">Procesado por Wompi</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
