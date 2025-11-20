import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Package, Eye } from "lucide-react";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function OrdersPage() {
  const supabase = await createClient();

  // Intentar obtener todos los pedidos con información del usuario
  let orders = [];
  let error = null;

  try {
    const { data, error: fetchError } = await supabase
      .from("orders") // Asumiendo que existe una tabla de pedidos
      .select(`
        *,
        profiles (full_name, email)
      `)
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error("Error fetching orders:", fetchError);
      error = fetchError;
    } else {
      orders = data;
    }
  } catch (err) {
    console.error("Unexpected error fetching orders:", err);
    error = err;
  }

  // Si hay un error de tabla no encontrada o similar, mostrar un mensaje
  if (error && (error as any).code === '42P01') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Gestión de Pedidos</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Tabla de Pedidos no encontrada</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              La tabla "orders" no existe en la base de datos. Por favor, crea la tabla de pedidos para comenzar a gestionar los pedidos.
            </p>
            <div className="mt-4">
              <h3 className="font-medium">Estructura recomendada para la tabla "orders":</h3>
              <ul className="mt-2 text-sm text-muted-foreground list-disc pl-5 space-y-1">
                <li>id (UUID) - Identificador único</li>
                <li>user_id (UUID) - Relación con el usuario</li>
                <li>total_amount (NUMERIC) - Monto total del pedido</li>
                <li>status (TEXT) - Estado del pedido (pending, processing, completed, cancelled)</li>
                <li>payment_method (TEXT) - Método de pago</li>
                <li>created_at (TIMESTAMP) - Fecha de creación</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestión de Pedidos</h1>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No hay pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Aún no hay pedidos registrados en el sistema.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-md border">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[50px]">#</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID Pedido</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Cliente</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Total</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Estado</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Fecha</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id} className="border-b">
                  <td className="p-4 align-middle">{index + 1}</td>
                  <td className="p-4 align-middle font-medium">#{order.id}</td>
                  <td className="p-4 align-middle text-sm text-muted-foreground">
                    {order.profiles?.full_name || order.profiles?.email || 'Cliente Anónimo'}
                  </td>
                  <td className="p-4 align-middle">${order.total_amount}</td>
                  <td className="p-4 align-middle">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status === 'completed' ? 'Completado' :
                       order.status === 'processing' ? 'Procesando' :
                       order.status === 'cancelled' ? 'Cancelado' :
                       'Pendiente'}
                    </span>
                  </td>
                  <td className="p-4 align-middle text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 align-middle">
                    <Link href={`/admin/orders/${order.id}`}>
                      <Button variant="outline" size="sm" title="Ver pedido">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}