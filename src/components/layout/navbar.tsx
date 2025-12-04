import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { Button } from "@/components/ui/button"
import MobileMenu from "./mobile-menu"

export default async function Navbar() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md border-b border-white/10" />

            <div className="container relative flex h-16 items-center justify-center">
                {/* Desktop Center Group: Logo + Links */}
                <div className="hidden md:flex items-center gap-12">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="relative">
                            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-100 to-amber-200 font-playfair tracking-tight group-hover:text-white transition-colors duration-300">
                                Servicios Digitales
                            </span>
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full" />
                        </div>
                        <span className="text-sm font-light text-white/80 tracking-widest uppercase border-l border-white/20 pl-2 ml-2">
                            Popayán
                        </span>
                    </Link>

                    <div className="flex items-center gap-8 text-sm font-medium text-white/90">
                        <Link href="/services" className="relative group py-2">
                            <span className="group-hover:text-amber-300 transition-colors">Servicios</span>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full" />
                        </Link>
                        <Link href="/support" className="relative group py-2">
                            <span className="group-hover:text-amber-300 transition-colors">Soporte</span>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    </div>
                </div>

                {/* Mobile Logo */}
                <div className="md:hidden flex items-center justify-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-white">
                            SD/IA Popayán
                        </span>
                    </Link>
                </div>

                {/* Desktop Right Group: Auth Buttons */}
                <div className="hidden md:flex items-center gap-6 absolute right-4 lg:right-8">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard">
                                <Button variant="ghost" className="text-white hover:text-amber-300 hover:bg-white/10">
                                    Panel de Control
                                </Button>
                            </Link>
                            <form action="/auth/signout" method="post">
                                <Button variant="outline" type="submit" className="glass-button text-white border-white/30 hover:bg-white/10 hover:border-white/50">
                                    Cerrar Sesión
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/login" className="text-xs font-medium text-white/80 hover:text-white transition-colors">
                                Iniciar Sesión
                            </Link>
                            <Link href="/register">
                                <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 shadow-lg shadow-orange-500/20 h-8 px-4 text-xs">
                                    Comenzar Ahora
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden absolute right-4">
                    <MobileMenu isLoggedIn={!!user} />
                </div>
            </div>
        </nav >
    )
}
