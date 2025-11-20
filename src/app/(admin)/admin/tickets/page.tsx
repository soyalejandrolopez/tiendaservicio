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
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Gestión de Tickets</h1>

            <div className="rounded-md border">
                <table className="w-full">
                    <thead className="border-b">
                        <tr>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[50px]">#</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Asunto</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email / Nombre</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Descripción</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Tipo</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Estado</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ticketsWithEmails?.map((ticket, index) => (
                            <tr key={ticket.id} className="border-b">
                                <td className="p-4 align-middle">{index + 1}</td>
                                <td className="p-4 align-middle font-medium">{ticket.subject}</td>
                                <td className="p-4 align-middle text-sm text-muted-foreground">
                                    <div>{ticket.email}</div>
                                    {ticket.guest_name && <div className="text-xs text-muted-foreground">{ticket.name}</div>}
                                </td>
                                <td className="p-4 align-middle text-sm text-muted-foreground max-w-xs truncate">{ticket.description}</td>
                                <td className="p-4 align-middle">
                                    <Badge variant="outline">
                                        {ticket.user_id ? "Registrado" : "Invitado"}
                                    </Badge>
                                </td>
                                <td className="p-4 align-middle">
                                    <Badge variant={ticket.status === "open" ? "destructive" : ticket.status === "in_progress" ? "secondary" : "default"}>
                                        {ticket.status === "open" ? "Abierto" : ticket.status === "in_progress" ? "En Progreso" : "Cerrado"}
                                    </Badge>
                                </td>
                                <td className="p-4 align-middle flex gap-2">
                                    <form action={updateStatus}>
                                        <input type="hidden" name="id" value={ticket.id} />
                                        <input type="hidden" name="status" value="in_progress" />
                                        <Button size="sm" variant="outline" disabled={ticket.status === "in_progress"} title="Marcar en progreso">
                                            <MessageCircle className="h-4 w-4" />
                                        </Button>
                                    </form>
                                    <form action={updateStatus}>
                                        <input type="hidden" name="id" value={ticket.id} />
                                        <input type="hidden" name="status" value="closed" />
                                        <Button size="sm" variant="outline" disabled={ticket.status === "closed"} title="Cerrar ticket">
                                            <span className="text-xs">Cerrar</span>
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
