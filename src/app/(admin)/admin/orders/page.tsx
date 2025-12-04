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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white font-playfair">Gestión de Pedidos</h1>
      </div>

      {orders.length === 0 ? (
        <Card className="glass-card bg-black/40 backdrop-blur-md border-white/10">
          <CardHeader>
            <CardTitle className="text-white">No hay pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300">Aún no hay pedidos registrados en el sistema.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-xl border border-white/10 glass-card bg-black/40 backdrop-blur-md overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                <th className="h-12 px-6 text-left align-middle font-medium text-slate-300 w-[50px]">#</th>
                <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">ID Pedido</th>
                <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Cliente</th>
                <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Total</th>
                <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Estado</th>
                <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Fecha</th>
                <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-6 align-middle text-white/70">{index + 1}</td>
                  <td className="p-6 align-middle font-medium text-white">#{order.id.slice(0, 8)}...</td>
                  <td className="p-6 align-middle text-sm text-slate-300">
                    {order.profiles?.full_name || order.profiles?.email || 'Cliente Anónimo'}
                  </td>
                  <td className="p-6 align-middle text-amber-400 font-medium">${order.total_amount}</td>
                  <td className="p-6 align-middle">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${order.status === 'completed' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                        order.status === 'processing' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                          order.status === 'cancelled' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                            'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      }`}>
                      {order.status === 'completed' ? 'Completado' :
                        order.status === 'processing' ? 'Procesando' :
                          order.status === 'cancelled' ? 'Cancelado' :
                            'Pendiente'}
                    </span>
                  </td>
                  <td className="p-6 align-middle text-sm text-slate-400">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-6 align-middle">
                    <Link href={`/admin/orders/${order.id}`}>
                      <Button variant="ghost" size="sm" className="text-amber-400 hover:text-amber-300 hover:bg-amber-400/10" title="Ver pedido">
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