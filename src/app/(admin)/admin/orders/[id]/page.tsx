import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";

export const dynamic = 'force-dynamic';

export default async function OrderDetailPage({
  params
}: {
  params: { id: string }
}) {
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
      .eq("id", params.id)
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
      .eq("order_id", params.id);

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
    <div className="space-y-4 max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Detalles del Pedido #{order.id}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Fecha: {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
            <Badge className={
              order.status === 'completed' ? 'bg-green-500' :
              order.status === 'processing' ? 'bg-yellow-500' :
              order.status === 'cancelled' ? 'bg-red-500' :
              'bg-blue-500'
            }>
              {order.status === 'completed' ? 'Completado' :
               order.status === 'processing' ? 'Procesando' :
               order.status === 'cancelled' ? 'Cancelado' :
               'Pendiente'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-lg mb-2">Información del Cliente</h3>
              <p><span className="font-medium">Nombre:</span> {order.profiles?.full_name || 'N/A'}</p>
              <p><span className="font-medium">Email:</span> {order.profiles?.email || 'N/A'}</p>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Resumen del Pedido</h3>
              <p><span className="font-medium">Total:</span> ${formatPrice(order.total_amount)}</p>
              <p><span className="font-medium">Método de Pago:</span> {order.payment_method || 'N/A'}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-lg mb-2">Items del Pedido</h3>
            {itemsError ? (
              <p className="text-muted-foreground">
                Error al cargar los items del pedido.
              </p>
            ) : orderItems.length === 0 ? (
              <p className="text-muted-foreground">
                No hay items en este pedido.
              </p>
            ) : (
              <div className="rounded-md border">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Servicio</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Precio</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Cantidad</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="p-4 align-middle font-medium">{item.services?.title || 'Servicio eliminado'}</td>
                        <td className="p-4 align-middle">${formatPrice(item.price)}</td>
                        <td className="p-4 align-middle">{item.quantity}</td>
                        <td className="p-4 align-middle">${formatPrice(item.price * item.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <div className="text-right">
              <p className="text-lg"><span className="font-medium">Total del Pedido:</span> <span className="text-xl font-bold">${formatPrice(order.total_amount)}</span></p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}