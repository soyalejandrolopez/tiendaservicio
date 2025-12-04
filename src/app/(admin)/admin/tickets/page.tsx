import { createClient } from "@/utils/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { Edit, MessageCircle } from "lucide-react";

export const dynamic = 'force-dynamic';

async function updateStatus(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const status = formData.get("status") as string;
    const supabase = await createClient();
    await supabase.from("tickets").update({ status }).eq("id", id);
    revalidatePath("/admin/tickets");
}

export default async function AdminTicketsPage() {
    const supabase = await createClient();

    // Obtener todos los tickets sin RLS para admin
    const { data: tickets, error } = await supabase
        .from("tickets")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching tickets:", error);
    }

    // Obtener emails de usuarios registrados
    const userIds = tickets?.filter(t => t.user_id).map(t => t.user_id) || [];
    const { data: profiles } = userIds.length > 0
        ? await supabase.from("profiles").select("id, email").in("id", userIds)
        : { data: [] };

    // Mapear emails a tickets
    const ticketsWithEmails = tickets?.map(ticket => ({
        ...ticket,
        email: ticket.guest_email || profiles?.find(p => p.id === ticket.user_id)?.email || "N/A",
        name: ticket.guest_name || "Usuario registrado"
    }));

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white font-playfair">Gestión de Tickets</h1>

            <div className="rounded-xl border border-white/10 glass-card bg-black/40 backdrop-blur-md overflow-hidden">
                <table className="w-full">
                    <thead className="border-b border-white/10 bg-white/5">
                        <tr>
                            <th className="h-12 px-6 text-left align-middle font-medium text-slate-300 w-[50px]">#</th>
                            <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Asunto</th>
                            <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Email / Nombre</th>
                            <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Descripción</th>
                            <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Tipo</th>
                            <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Estado</th>
                            <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ticketsWithEmails?.map((ticket, index) => (
                            <tr key={ticket.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                                <td className="p-6 align-middle text-white/70">{index + 1}</td>
                                <td className="p-6 align-middle font-medium text-white">{ticket.subject}</td>
                                <td className="p-6 align-middle text-sm text-slate-300">
                                    <div className="text-white">{ticket.email}</div>
                                    {ticket.guest_name && <div className="text-xs text-slate-400">{ticket.name}</div>}
                                </td>
                                <td className="p-6 align-middle text-sm text-slate-300 max-w-xs truncate">{ticket.description}</td>
                                <td className="p-6 align-middle">
                                    <Badge variant="outline" className="border-white/20 text-slate-300">
                                        {ticket.user_id ? "Registrado" : "Invitado"}
                                    </Badge>
                                </td>
                                <td className="p-6 align-middle">
                                    <Badge className={`${ticket.status === "open" ? "bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30" :
                                            ticket.status === "in_progress" ? "bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30" :
                                                "bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30"
                                        } border`}>
                                        {ticket.status === "open" ? "Abierto" : ticket.status === "in_progress" ? "En Progreso" : "Cerrado"}
                                    </Badge>
                                </td>
                                <td className="p-6 align-middle flex gap-2">
                                    <form action={updateStatus}>
                                        <input type="hidden" name="id" value={ticket.id} />
                                        <input type="hidden" name="status" value="in_progress" />
                                        <Button size="sm" variant="ghost" disabled={ticket.status === "in_progress"} className="text-amber-400 hover:text-amber-300 hover:bg-amber-400/10" title="Marcar en progreso">
                                            <MessageCircle className="h-4 w-4" />
                                        </Button>
                                    </form>
                                    <form action={updateStatus}>
                                        <input type="hidden" name="id" value={ticket.id} />
                                        <input type="hidden" name="status" value="closed" />
                                        <Button size="sm" variant="ghost" disabled={ticket.status === "closed"} className="text-green-400 hover:text-green-300 hover:bg-green-400/10" title="Cerrar ticket">
                                            <span className="text-xs font-bold">✓</span>
                                        </Button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
