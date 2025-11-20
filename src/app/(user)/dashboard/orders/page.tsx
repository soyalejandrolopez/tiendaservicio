import { createClient } from "@/utils/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

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
        <div className="container py-12 space-y-4">
            <h1 className="text-2xl font-bold">Mis Pedidos</h1>

            {orders && orders.length > 0 ? (
                <div className="rounded-md border">
                    <table className="w-full">
                        <thead className="border-b">
                            <tr>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[50px]">#</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Servicio</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Monto</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Fecha</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Estado</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order.id} className="border-b">
                                    <td className="p-4 align-middle">{index + 1}</td>
                                    <td className="p-4 align-middle font-medium">{order.service_title}</td>
                                    <td className="p-4 align-middle">${order.amount}</td>
                                    <td className="p-4 align-middle text-sm text-muted-foreground">
                                        {new Date(order.created_at).toLocaleDateString("es-ES")}
                                    </td>
                                    <td className="p-4 align-middle">
                                        <Badge 
                                            variant={
                                                order.status === "completed" ? "default" : 
                                                order.status === "cancelled" ? "destructive" : 
                                                "secondary"
                                            }
                                        >
                                            {order.status === "completed" ? "Completado" : 
                                             order.status === "cancelled" ? "Cancelado" : 
                                             "Pendiente"}
                                        </Badge>
                                    </td>
                                    <td className="p-4 align-middle">
                                        {order.status === "pending" && (
                                            <form action={cancelOrder}>
                                                <input type="hidden" name="id" value={order.id} />
                                                <Button size="sm" variant="destructive" type="submit">
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
                <div className="rounded-md border p-8 text-center">
                    <p className="text-muted-foreground">No tienes pedidos aún.</p>
                </div>
            )}
        </div>
    );
}
