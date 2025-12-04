"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Shield, Star, MapPin, Award, Clock } from "lucide-react";
import { useRef, useEffect, useState } from "react";

// Floating particle component
function FloatingParticle({ delay, duration, size, x, y }: {
  delay: number;
  duration: number;
  size: number;
  x: string;
  y: string;
}) {
  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-br from-amber-400/40 to-orange-500/20"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        filter: 'blur(1px)',
      }}
      animate={{
        y: [0, -40, 0],
        x: [0, 15, -15, 0],
        opacity: [0.3, 0.8, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Animated counter component
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}{suffix}</span>;
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax scroll effect
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Smooth spring animation for mouse tracking
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Handle mouse move for parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set((e.clientX - centerX) / 50);
      mouseY.set((e.clientY - centerY) / 50);
    }
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const statsVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hyperrealistic Popayán Background Image */}
      {/* Background is handled by layout.tsx (BackgroundSlideshow) */}

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingParticle delay={0} duration={6} size={8} x="10%" y="20%" />
        <FloatingParticle delay={1} duration={8} size={6} x="80%" y="15%" />
        <FloatingParticle delay={2} duration={7} size={10} x="20%" y="70%" />
        <FloatingParticle delay={0.5} duration={9} size={5} x="70%" y="60%" />
        <FloatingParticle delay={1.5} duration={6.5} size={7} x="40%" y="30%" />
        <FloatingParticle delay={3} duration={8} size={4} x="90%" y="80%" />
        <FloatingParticle delay={2.5} duration={7.5} size={6} x="5%" y="50%" />
        <FloatingParticle delay={4} duration={6} size={8} x="60%" y="10%" />
      </div>

      {/* Light beam effect */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-[120%] bg-gradient-to-b from-amber-500/5 via-transparent to-transparent -rotate-12 blur-3xl"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content */}
      <motion.div
        className="container px-4 md:px-6 relative z-10 text-center mx-auto"
        style={{ y: contentY, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Location Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass-card hover-glow cursor-default"
          >
            <MapPin className="w-3 h-3 text-amber-400" />
            <span className="text-[9px] font-medium text-white/90 uppercase tracking-wider">Popayán, La Ciudad Blanca de Colombia</span>
            <Sparkles className="w-3 h-3 text-amber-400" />
          </motion.div>

          {/* Main Title with parallax */}
          <motion.div
            style={{
              x: smoothMouseX,
              y: smoothMouseY,
            }}
          >
            <motion.h1
              variants={itemVariants}
              className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-white mb-4 text-shadow-lg"
            >
              <span className="block">Servicios Digitales</span>
              <motion.span
                className="block mt-2 text-gradient-gold"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                & Inteligencia Artificial
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed text-shadow-sm"
          >
            Transformamos ideas en soluciones tecnológicas de vanguardia.
            <span className="block mt-2 text-amber-300/90">
              Innovación, calidad y confianza desde el corazón del Cauca.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10"
          >
            <Link href="#services">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white border-0 px-8 py-5 text-base font-semibold shadow-2xl shadow-orange-500/30 animate-glow-pulse transition-all duration-500"
                >
                  <span className="relative z-10 flex items-center">
                    Explorar Servicios
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                </Button>
              </motion.div>
            </Link>

            <Link href="/support">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="glass-button px-8 py-5 text-base font-semibold text-white hover:text-white"
                >
                  Contactar Soporte
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto"
          >
            {[
              { icon: Award, value: 150, suffix: "+", label: "Proyectos Exitosos" },
              { icon: Star, value: 98, suffix: "%", label: "Satisfacción" },
              { icon: Clock, value: 24, suffix: "/7", label: "Soporte Activo" },
              { icon: Shield, value: 100, suffix: "%", label: "Garantizado" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={statsVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card rounded-xl p-3 hover-glow cursor-default"
              >
                <stat.icon className="w-4 h-4 text-amber-400 mx-auto mb-1.5" />
                <div className="text-lg md:text-xl font-bold text-white mb-0.5">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] md:text-xs text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Strip */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 md:gap-10 mt-16 pt-10 border-t border-white/10"
          >
            {[
              { icon: Zap, text: "Entrega Rápida", color: "text-amber-400" },
              { icon: Shield, text: "100% Seguro", color: "text-emerald-400" },
              { icon: Star, text: "Calidad Premium", color: "text-blue-400" },
              { icon: Award, text: "Certificados", color: "text-purple-400" },
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-default"
                whileHover={{ scale: 1.1 }}
              >
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
                <span className="text-sm font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/50 uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-amber-400 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </section>
  );
}
