import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { Button } from "@/components/ui/button"
import MobileMenu from "./mobile-menu"

export default async function Navbar() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <nav className="hidden md:block border-b bg-black/50 sticky top-0 z-50">
            <div className="container flex h-16 items-center justify-between">
                <div className="hidden md:flex items-center justify-center gap-8 flex-1">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-white drop-shadow-[0_0_0_#000]">
                            alejandrotech servicios
                        </span>
                    </Link>
                    <div className="flex items-center gap-6 text-sm font-bold text-white">
                        <Link href="/services" className="hover:text-blue-300 transition-colors hover:underline underline-offset-4">
                            Servicios
                        </Link>
                        <Link href="/support" className="hover:text-blue-300 transition-colors hover:underline underline-offset-4">
                            Soporte
                        </Link>
                    </div>
                </div>
                <div className="md:hidden flex items-center justify-center flex-1">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-white drop-shadow-[0_0_0_#000]">
                            alejandrotech servicios
                        </span>
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard">
                                <Button variant="ghost" className="hover:bg-accent text-white font-bold">Panel</Button>
                            </Link>
                            <form action="/auth/signout" method="post">
                                <Button variant="outline" type="submit" className="text-black border-black hover:bg-black hover:text-white font-bold">
                                    Cerrar Sesión
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/login" className="text-sm font-bold text-white hover:text-blue-300 transition-colors hover:underline underline-offset-4">
                                Iniciar Sesión
                            </Link>
                            <Link href="/register">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold">Registro</Button>
                            </Link>
                        </div>
                    )}
                </div>

                <MobileMenu isLoggedIn={!!user} />
            </div>
        </nav>
    )
}
