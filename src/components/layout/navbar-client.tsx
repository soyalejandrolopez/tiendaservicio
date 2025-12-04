"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import MobileMenu from "./mobile-menu";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface NavbarClientProps {
  isLoggedIn: boolean;
}

export default function NavbarClient({ isLoggedIn }: NavbarClientProps) {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className="hidden md:block sticky top-0 z-50"
    >
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl border-b border-white/10" />

      <div className="container relative flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25"
          >
            <Sparkles className="w-5 h-5 text-white" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
              Servicios IA
            </span>
            <span className="text-xs text-white/50 font-medium -mt-0.5">
              Popayán
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <NavLink href="/services">Servicios</NavLink>
          <NavLink href="/support">Soporte</NavLink>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="text-white/80 hover:text-white hover:bg-white/10 font-medium"
                >
                  Mi Panel
                </Button>
              </Link>
              <form action="/auth/signout" method="post">
                <Button
                  variant="outline"
                  type="submit"
                  className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white/30 font-medium"
                >
                  Cerrar Sesión
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-white/80 hover:text-white hover:bg-white/10 font-medium"
                >
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg shadow-amber-500/25 border-0">
                    Registro Gratis
                  </Button>
                </motion.div>
              </Link>
            </div>
          )}
        </div>

        <MobileMenu isLoggedIn={isLoggedIn} />
      </div>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative text-sm font-medium text-white/70 hover:text-white transition-colors group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-full transition-all duration-300" />
    </Link>
  );
}
