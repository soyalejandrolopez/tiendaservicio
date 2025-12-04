import { createClient } from "@/utils/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

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
                <div className="rounded-xl border border-white/10 glass-card bg-black/40 backdrop-blur-md overflow-hidden">
                    <table className="w-full">
                        <thead className="border-b border-white/10 bg-white/5">
                            <tr>
                                <th className="h-12 px-6 text-left align-middle font-medium text-slate-300 w-[50px]">#</th>
                                <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Servicio</th>
                                <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Monto</th>
                                <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Fecha</th>
                                <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Estado</th>
                                <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                                    <td className="p-6 align-middle text-white/70">{index + 1}</td>
                                    <td className="p-6 align-middle font-medium text-white">{order.service_title}</td>
                                    <td className="p-6 align-middle text-amber-400 font-medium">${order.amount}</td>
                                    <td className="p-6 align-middle text-sm text-slate-400">
                                        {new Date(order.created_at).toLocaleDateString("es-ES")}
                                    </td>
                                    <td className="p-6 align-middle">
                                        <Badge
                                            className={`${order.status === "completed" ? "bg-green-500/20 text-green-300 border-green-500/30" :
                                                order.status === "cancelled" ? "bg-red-500/20 text-red-300 border-red-500/30" :
                                                    "bg-blue-500/20 text-blue-300 border-blue-500/30"
                                                } border`}
                                        >
                                            {order.status === "completed" ? "Completado" :
                                                order.status === "cancelled" ? "Cancelado" :
                                                    "Pendiente"}
                                        </Badge>
                                    </td>
                                    <td className="p-6 align-middle">
                                        {order.status === "pending" && (
                                            <form action={cancelOrder}>
                                                <input type="hidden" name="id" value={order.id} />
                                                <Button size="sm" variant="ghost" type="submit" className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
                                                    Cancelar
                                                </Button>
                                            </form>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
