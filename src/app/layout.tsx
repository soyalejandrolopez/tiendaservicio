import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import MobileBottomNav from "@/components/layout/mobile-bottom-nav";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Virtual Service Store",
  description: "Buy services and manage tickets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(inter.className, "min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950")}
        suppressHydrationWarning
      >
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 relative z-10 pb-20 md:pb-0">{children}</main>
          <Footer />
          <MobileBottomNav />
        </div>
      </body>
    </html>
  );
}
