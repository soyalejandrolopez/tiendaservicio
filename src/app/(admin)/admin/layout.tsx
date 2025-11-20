import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, PlusCircle, List, Ticket, Package } from "lucide-react";

export default async function AdminLayout({
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

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role !== "admin") {
        redirect("/");
    }

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <aside className="w-full border-r bg-white/90 backdrop-blur-sm md:w-64 md:min-h-screen">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/admin" className="flex items-center gap-2 font-semibold">
                        <LayoutDashboard className="h-6 w-6" />
                        <span className="font-bold">Panel de Administración</span>
                    </Link>
                </div>
                <nav className="grid items-start px-2 text-sm font-bold lg:px-4">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-black transition-all hover:bg-accent hover:text-foreground"
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Resumen
                    </Link>
                    <Link
                        href="/admin/services"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-black transition-all hover:bg-accent hover:text-foreground"
                    >
                        <PlusCircle className="h-4 w-4" />
                        Servicios
                    </Link>
                    <Link
                        href="/admin/orders"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-black transition-all hover:bg-accent hover:text-foreground"
                    >
                        <Package className="h-4 w-4" />
                        Pedidos
                    </Link>
                    <Link
                        href="/admin/tickets"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-black transition-all hover:bg-accent hover:text-foreground"
                    >
                        <Ticket className="h-4 w-4" />
                        Tickets
                    </Link>
                </nav>
            </aside>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-white">
                {children}
            </main>
        </div>
    );
}
