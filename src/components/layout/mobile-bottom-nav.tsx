"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, User, Ticket } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Home, label: "Inicio" },
    { href: "/services", icon: ShoppingBag, label: "Servicios" },
    { href: "/support", icon: Ticket, label: "Soporte" },
    { href: "/dashboard/profile", icon: User, label: "Perfil" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive
                  ? "text-orange-500"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Icon className={`h-6 w-6 ${isActive ? "fill-orange-500" : ""}`} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
