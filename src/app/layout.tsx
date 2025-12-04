import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import MobileBottomNav from "@/components/layout/mobile-bottom-nav";
import { cn } from "@/lib/utils";
import BackgroundSlideshow from "@/components/ui/BackgroundSlideshow";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: "Servicios digitales/IA Popayán - Soluciones Digitales e Inteligencia Artificial",
  description: "Servicios digitales premium e inteligencia artificial en Popayán, la Ciudad Blanca de Colombia. Soluciones innovadoras para tu negocio",
  keywords: ["Popayán", "servicios digitales", "inteligencia artificial", "Colombia", "tecnología"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body
        className={cn(inter.className, "min-h-screen flex flex-col relative overflow-x-hidden")}
        suppressHydrationWarning
      >
        <BackgroundSlideshow />

        <div className="min-h-screen flex flex-col relative z-0">
          <Navbar />
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
          <Footer />
          <MobileBottomNav />
        </div>
      </body>
    </html>
  );
}
