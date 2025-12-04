import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import OrderActivationForm from "@/components/admin/order-activation-form";

export const dynamic = 'force-dynamic';

export default async function OrderDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const supabase = await createClient();

  // Obtener detalles del pedido
  let order = null;
  let orderError = null;

  try {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        profiles (full_name, email)
      `)
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching order:", error);
      orderError = error;
    } else {
      order = data;
    }
  } catch (err) {
    console.error("Unexpected error fetching order:", err);
    orderError = err;
  }

  if (orderError || !order) {
    // Verificar si es un error de tabla no encontrada
    if (orderError && (orderError as any).code === '42P01') {
      return (
        <div className="space-y-4 max-w-4xl mx-auto p-4">
          <Card>
            <CardHeader>
              <CardTitle>Tabla de Pedidos no encontrada</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                La tabla "orders" no existe en la base de datos.
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }
    notFound();
  }

  // Obtener los items del pedido
  let orderItems = [];
  let itemsError = null;

  try {
    const { data, error } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", id);

    if (error) {
      console.error("Error fetching order items:", error);
      itemsError = error;
    } else {
      orderItems = data;
    }
  } catch (err) {
    console.error("Unexpected error fetching order items:", err);
    itemsError = err;
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Order Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card bg-black/40 backdrop-blur-md border-white/10">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white">Detalles del Pedido #{order.id.slice(0, 8)}</CardTitle>
                  <p className="text-sm text-slate-400 mt-1">
                    Fecha: {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
                <Badge className={
                  order.status === 'completed' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                    order.status === 'processing' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                      order.status === 'cancelled' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                        'bg-blue-500/20 text-blue-300 border-blue-500/30'
                }>
                  {order.status === 'completed' ? 'Completado' :
                    order.status === 'processing' ? 'Procesando' :
                      order.status === 'cancelled' ? 'Cancelado' :
                        'Pendiente'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-medium text-lg mb-2 text-amber-400">Información del Cliente</h3>
                  <p className="text-slate-300"><span className="font-medium text-slate-400">Nombre:</span> {order.profiles?.full_name || 'N/A'}</p>
                  <p className="text-slate-300"><span className="font-medium text-slate-400">Email:</span> {order.profiles?.email || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2 text-amber-400">Resumen del Pedido</h3>
                  <p className="text-slate-300"><span className="font-medium text-slate-400">Total:</span> ${formatPrice(order.total_amount)}</p>
                  <p className="text-slate-300"><span className="font-medium text-slate-400">Método de Pago:</span> {order.payment_method || 'N/A'}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-4 text-white">Items del Pedido</h3>
                {itemsError ? (
                  <p className="text-red-400">Error al cargar los items del pedido.</p>
                ) : orderItems.length === 0 ? (
                  <p className="text-slate-400">No hay items en este pedido.</p>
                ) : (
                  <div className="rounded-lg border border-white/10 overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-white/5 border-b border-white/10">
                        <tr>
                          <th className="h-10 px-4 text-left align-middle font-medium text-slate-400">Servicio</th>
                          <th className="h-10 px-4 text-left align-middle font-medium text-slate-400">Precio</th>
                          <th className="h-10 px-4 text-left align-middle font-medium text-slate-400">Cant.</th>
                          <th className="h-10 px-4 text-left align-middle font-medium text-slate-400">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderItems.map((item) => (
                          <tr key={item.id} className="border-b border-white/10 last:border-0 hover:bg-white/5">
                            <td className="p-4 align-middle font-medium text-white">{item.services?.title || 'Servicio eliminado'}</td>
                            <td className="p-4 align-middle text-slate-300">${formatPrice(item.price)}</td>
                            <td className="p-4 align-middle text-slate-300">{item.quantity}</td>
                            <td className="p-4 align-middle text-amber-400 font-medium">${formatPrice(item.price * item.quantity)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <div className="text-right">
                  <p className="text-lg text-white"><span className="font-medium text-slate-400">Total del Pedido:</span> <span className="text-2xl font-bold ml-2 text-amber-400">${formatPrice(order.total_amount)}</span></p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Activation Actions */}
        <div className="lg:col-span-1">
          <Card className="glass-card bg-black/40 backdrop-blur-md border-white/10 sticky top-6">
            <CardHeader>
              <CardTitle className="text-white">Activación del Servicio</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderActivationForm
                orderId={order.id}
                currentActivationUrl={order.activation_url}
                currentCredentials={order.service_credentials}
                isCompleted={order.status === 'completed'}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}