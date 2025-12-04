"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Shield, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-20 w-3 h-3 bg-blue-400 rounded-full"
          animate={{
            y: [0, -30, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-2 h-2 bg-white rounded-full"
          animate={{
            y: [0, -25, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-white/90">La Ciudad Blanca de Colombia</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6"
          >
            <span className="block">Servicios Digitales</span>
            <span className="block mt-2 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              & Inteligencia Artificial
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Impulsamos tu negocio con soluciones tecnológicas de vanguardia desde el corazón de Popayán.
            Innovación, calidad y confianza en cada proyecto.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="#services">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 px-8 py-6 text-lg font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
              >
                Explorar Servicios
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/support">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg font-semibold bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                Contactar Soporte
              </Button>
            </Link>
          </motion.div>

          {/* Features Strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6 md:gap-10 mt-16 pt-10 border-t border-white/10"
          >
            <div className="flex items-center gap-2 text-white/60">
              <Zap className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-medium">Entrega Rápida</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium">100% Seguro</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Star className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium">Calidad Premium</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white/60 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
