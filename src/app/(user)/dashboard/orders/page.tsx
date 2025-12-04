import { createClient } from "@/utils/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { ExternalLink, Key, Loader2 } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function cancelOrder(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const supabase = await createClient();
    await supabase.from("orders").update({ status: "cancelled" }).eq("id", id);
    revalidatePath("/dashboard/orders");
}

export default async function OrdersPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: orders } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

    return (
        <div className="container py-12 space-y-6">
            <h1 className="text-3xl font-bold text-white font-playfair">Mis Pedidos</h1>

            {orders && orders.length > 0 ? (
                <div className="grid gap-6">
                    {orders.map((order) => (
                        <div key={order.id} className="rounded-xl border border-white/10 glass-card bg-black/40 backdrop-blur-md overflow-hidden p-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-white/10 pb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{order.service_title || "Servicio"}</h3>
                                    <p className="text-sm text-slate-400">Pedido #{order.id.slice(0, 8)} • {new Date(order.created_at).toLocaleDateString("es-ES")}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl font-bold text-amber-400">${order.amount}</span>
                                    <Badge
                                        className={`${order.status === "completed" ? "bg-green-500/20 text-green-300 border-green-500/30" :
                                            order.status === "cancelled" ? "bg-red-500/20 text-red-300 border-red-500/30" :
                                                "bg-blue-500/20 text-blue-300 border-blue-500/30"
                                            } border px-3 py-1`}
                                    >
                                        {order.status === "completed" ? "Activo" :
                                            order.status === "cancelled" ? "Cancelado" :
                                                "Pendiente de Activación"}
                                    </Badge>
                                </div>
                            </div>

                            {/* Activation Details Section */}
                            {order.status === "completed" && (
                                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
                                    <h4 className="text-green-400 font-bold mb-3 flex items-center gap-2">
                                        <Key className="w-4 h-4" />
                                        Credenciales de Acceso
                                    </h4>

                                    {order.activation_url && (
                                        <div className="mb-3">
                                            <p className="text-xs text-green-300/70 uppercase font-bold mb-1">URL de Acceso</p>
                                            <Link
                                                href={order.activation_url}
                                                target="_blank"
                                                className="text-white hover:text-green-300 underline flex items-center gap-2 break-all"
                                            >
                                                {order.activation_url}
                                                <ExternalLink className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    )}

                                    {order.service_credentials && (
                                        <div>
                                            <p className="text-xs text-green-300/70 uppercase font-bold mb-1">Credenciales / Instrucciones</p>
                                            <pre className="bg-black/30 p-3 rounded text-sm text-white whitespace-pre-wrap font-mono border border-white/5">
                                                {order.service_credentials}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            )}

                            {order.status !== "completed" && order.status !== "cancelled" && (
                                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4 flex items-center gap-3">
                                    <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                                    <div>
                                        <h4 className="text-blue-400 font-bold">Activación en Progreso</h4>
                                        <p className="text-sm text-blue-200/70">
                                            Estamos preparando tu servicio. Recibirás las credenciales aquí una vez que el pago sea validado y el servicio activado.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {order.status === "pending" && (
                                <div className="flex justify-end">
                                    <form action={cancelOrder}>
                                        <input type="hidden" name="id" value={order.id} />
                                        <Button size="sm" variant="ghost" type="submit" className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
                                            Cancelar Pedido
                                        </Button>
                                    </form>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border border-white/10 glass-card bg-black/40 backdrop-blur-md p-12 text-center">
                    <p className="text-slate-300 text-lg">No tienes pedidos aún.</p>
                    <p className="text-slate-500 text-sm mt-2">Explora nuestros servicios y realiza tu primer pedido.</p>
                </div>
            )}
        </div>
    );
}
