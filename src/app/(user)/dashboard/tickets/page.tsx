import { createClient } from "@/utils/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, MessageCircle } from "lucide-react";

export default async function UserTicketsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: tickets } = await supabase
        .from("tickets")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

    return (
        <div className="container py-12 space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Mis Tickets</h1>
                <Link href="/dashboard/tickets/new">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nuevo Ticket
                    </Button>
                </Link>
            </div>

            {tickets && tickets.length > 0 ? (
                <div className="rounded-md border">
                    <table className="w-full">
                        <thead className="border-b">
                            <tr>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[50px]">#</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Asunto</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Descripción</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Fecha</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets?.map((ticket, index) => (
                                <tr key={ticket.id} className="border-b">
                                    <td className="p-4 align-middle">{index + 1}</td>
                                    <td className="p-4 align-middle font-medium">{ticket.subject}</td>
                                    <td className="p-4 align-middle text-sm text-muted-foreground max-w-xs truncate">{ticket.description}</td>
                                    <td className="p-4 align-middle text-sm text-muted-foreground">{new Date(ticket.created_at).toLocaleDateString()}</td>
                                    <td className="p-4 align-middle">
                                        <Badge variant={ticket.status === "open" ? "destructive" : ticket.status === "in_progress" ? "secondary" : "default"}>
                                            {ticket.status === "open" ? "Abierto" : ticket.status === "in_progress" ? "En Progreso" : "Cerrado"}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="rounded-md border">
                    <table className="w-full">
                        <thead className="border-b">
                            <tr>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[50px]">#</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Asunto</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Descripción</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Fecha</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-muted-foreground">No se encontraron tickets.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
