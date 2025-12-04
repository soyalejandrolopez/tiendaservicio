import { createClient } from "@/utils/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, MessageCircle } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function UserTicketsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: tickets } = await supabase
        .from("tickets")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

    return (
        <div className="container py-12 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white font-playfair">Mis Tickets</h1>
                <Link href="/dashboard/tickets/new">
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 shadow-lg shadow-orange-500/20">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nuevo Ticket
                    </Button>
                </Link>
            </div>

            {tickets && tickets.length > 0 ? (
                <div className="rounded-xl border border-white/10 glass-card bg-black/40 backdrop-blur-md overflow-hidden">
                    <table className="w-full">
                        <thead className="border-b border-white/10 bg-white/5">
                            <tr>
                                <th className="h-12 px-6 text-left align-middle font-medium text-slate-300 w-[50px]">#</th>
                                <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Asunto</th>
                                <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Descripción</th>
                                <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Fecha</th>
                                <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets?.map((ticket, index) => (
                                <tr key={ticket.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                                    <td className="p-6 align-middle text-white/70">{index + 1}</td>
                                    <td className="p-6 align-middle font-medium text-white">{ticket.subject}</td>
                                    <td className="p-6 align-middle text-sm text-slate-300 max-w-xs truncate">{ticket.description}</td>
                                    <td className="p-6 align-middle text-sm text-slate-400">{new Date(ticket.created_at).toLocaleDateString()}</td>
                                    <td className="p-6 align-middle">
                                        <Badge className={`${ticket.status === "open" ? "bg-red-500/20 text-red-300 border-red-500/30" :
                                            ticket.status === "in_progress" ? "bg-amber-500/20 text-amber-300 border-amber-500/30" :
                                                "bg-green-500/20 text-green-300 border-green-500/30"
                                            } border`}>
                                            {ticket.status === "open" ? "Abierto" : ticket.status === "in_progress" ? "En Progreso" : "Cerrado"}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="rounded-xl border border-white/10 glass-card bg-black/40 backdrop-blur-md p-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="p-4 rounded-full bg-white/5 border border-white/10">
                            <MessageCircle className="h-8 w-8 text-slate-400" />
                        </div>
                        <p className="text-slate-300 text-lg">No se encontraron tickets.</p>
                        <p className="text-slate-500 text-sm max-w-sm">Si tienes algún problema con un servicio, crea un nuevo ticket y te ayudaremos lo antes posible.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
