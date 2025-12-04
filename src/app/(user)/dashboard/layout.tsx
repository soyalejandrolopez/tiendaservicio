import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Ticket, User, ShoppingBag, Package } from "lucide-react";

export default async function UserDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Check that the user is not an admin to ensure they use the user dashboard
    const { data: profile } = await supabase
        .from("profiles")
        .select("role, full_name")
        .eq("id", user.id)
        .single();

    // If admin, they should be in admin section, not user dashboard
    if (profile?.role === "admin") {
        redirect("/admin");
    }

    return (
        <div className="flex min-h-screen flex-col md:flex-row mt-0 pt-0">
            <aside className="w-full border-r border-white/10 glass-card bg-black/40 backdrop-blur-md md:w-64 md:min-h-screen flex flex-col justify-between">
                <div>
                    <div className="flex h-16 items-center border-b border-white/10 px-6">
                        <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-white">
                            <LayoutDashboard className="h-6 w-6 text-amber-500" />
                            <span className="font-bold font-playfair text-lg">Panel de Usuario</span>
                        </Link>
                    </div>
                    <nav className="grid items-start px-4 text-sm font-medium mt-6 gap-2">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-300 transition-all hover:bg-white/10 hover:text-white hover:shadow-lg"
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Resumen
                        </Link>
                        <Link
                            href="/dashboard/tickets"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-300 transition-all hover:bg-white/10 hover:text-white hover:shadow-lg"
                        >
                            <Ticket className="h-4 w-4" />
                            Mis Tickets
                        </Link>
                        <Link
                            href="/dashboard/orders"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-300 transition-all hover:bg-white/10 hover:text-white hover:shadow-lg"
                        >
                            <ShoppingBag className="h-4 w-4" />
                            Mis Pedidos
                        </Link>
                        <Link
                            href="/dashboard/services"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-300 transition-all hover:bg-white/10 hover:text-white hover:shadow-lg"
                        >
                            <Package className="h-4 w-4" />
                            Servicios
                        </Link>
                        <Link
                            href="/dashboard/profile"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-300 transition-all hover:bg-white/10 hover:text-white hover:shadow-lg"
                        >
                            <User className="h-4 w-4" />
                            Perfil
                        </Link>
                    </nav>
                </div>

                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5">
                        <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                            {profile?.full_name?.[0] || 'U'}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium text-white truncate">{profile?.full_name || 'Usuario'}</p>
                            <p className="text-xs text-slate-400 truncate">{user.email}</p>
                        </div>
                    </div>
                    <form action="/auth/signout" method="post" className="mt-2">
                        <button className="w-full flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-900/20 transition-colors">
                            Cerrar Sesión
                        </button>
                    </form>
                </div>
            </aside>

            <div className="flex-1 flex flex-col">
                <header className="h-16 border-b border-white/10 glass-card bg-black/20 backdrop-blur-sm px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span className="text-white font-medium">Dashboard</span>
                        <span>/</span>
                        <span>Resumen</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-white/10">
                            <span className="sr-only">Notificaciones</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                        </Button>
                    </div>
                </header>
                <main className="flex-1 flex flex-col gap-6 p-6 lg:p-8 bg-transparent overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}