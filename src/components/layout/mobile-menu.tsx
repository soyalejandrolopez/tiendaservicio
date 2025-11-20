"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface MobileMenuProps {
  isLoggedIn: boolean;
}

export default function MobileMenu({ isLoggedIn }: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="md:hidden p-2 rounded-md hover:bg-accent focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container py-4 flex flex-col space-y-3">
            <Link
              href="/#services"
              className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors py-2 hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Servicios
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors py-2 hover:underline underline-offset-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Panel
                </Link>
                <form action="/auth/signout" method="post">
                  <button
                    type="submit"
                    className="w-full text-left text-sm font-bold text-black hover:text-gray-700 transition-colors py-2"
                  >
                    Cerrar Sesión
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors py-2 hover:underline underline-offset-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold">Registro</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}