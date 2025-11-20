import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import MobileBottomNav from "@/components/layout/mobile-bottom-nav";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

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
        className={cn(inter.className, "min-h-screen flex flex-col")}
        suppressHydrationWarning
        style={{
          backgroundImage: "url('/background-digital.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="min-h-screen flex flex-col">
          <div
            className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-[-1]"
            style={{ background: 'rgba(0,0,0,0.4)' }}
          ></div>
          <Navbar />
          <main className="flex-1 relative z-10 pb-20 md:pb-0">{children}</main>
          <Footer />
          <MobileBottomNav />
        </div>
      </body>
    </html>
  );
}
