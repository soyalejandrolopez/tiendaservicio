import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function PaymentResultPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const id = params.id as string | undefined;

  // Default state
  let statusTitle = "Procesando Pago";
  let statusMessage = "Tu pago está siendo procesado. Por favor espera...";
  let statusIcon = <Clock className="h-16 w-16 text-yellow-500 mx-auto mb-4" />;
  let statusColor = "text-yellow-600";
  let isSuccess = false;

  if (id) {
    try {
      // 1. Verify transaction with Wompi
      const response = await fetch(`https://production.wompi.co/v1/transactions/${id}`);
      const data = await response.json();
      const transaction = data.data;

      if (transaction && transaction.status === "APPROVED") {
        isSuccess = true;
        statusTitle = "¡Pago Exitoso!";
        statusMessage = "Gracias por tu compra. Tu servicio ha sido activado.";
        statusIcon = <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />;
        statusColor = "text-green-600";

        // 2. Extract metadata from reference
        // Format: ORDER-{serviceId}-{userId}-{timestamp}
        const reference = transaction.reference;
        const parts = reference.split("-");

        if (parts.length >= 4 && parts[0] === "ORDER") {
          const serviceId = parts[1];
          const userId = parts[2];

          const supabase = await createClient();

          // 3. Check if order already exists
          const { data: existingOrder } = await supabase
            .from("orders")
            .select("id")
            .eq("wompi_reference", reference)
            .single();

          if (!existingOrder) {
            // 4. Fetch service details
            const { data: service } = await supabase
              .from("services")
              .select("title, price")
              .eq("id", serviceId)
              .single();

            if (service) {
              // 5. Create Order
              await supabase.from("orders").insert({
                user_id: userId,
                service_id: serviceId,
                service_title: service.title,
                amount: service.price, // Use service price or transaction.amount_in_cents / 100
                total_amount: service.price,
                status: "processing", // Default status until admin activates
                wompi_reference: reference,
                wompi_transaction_id: id,
                payment_method: transaction.payment_method_type,
                created_at: new Date().toISOString()
              });
            }
          }
        }
      } else if (transaction && transaction.status === "DECLINED") {
        statusTitle = "Pago Rechazado";
        statusMessage = "Tu pago fue rechazado por la entidad financiera.";
        statusIcon = <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />;
        statusColor = "text-red-600";
      } else if (transaction && transaction.status === "ERROR") {
        statusTitle = "Error en el Pago";
        statusMessage = "Ocurrió un error al procesar tu pago.";
        statusIcon = <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />;
        statusColor = "text-red-600";
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      statusTitle = "Error de Verificación";
      statusMessage = "No pudimos verificar el estado de tu pago. Por favor contacta a soporte.";
      statusIcon = <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />;
      statusColor = "text-red-600";
    }
  }

  return (
    <div className="container py-12 flex flex-col items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md bg-black/40 backdrop-blur-md border-white/10">
        <CardHeader className="text-center">
          <div className={statusColor}>{statusIcon}</div>
          <CardTitle className={`text-2xl font-bold ${statusColor}`}>{statusTitle}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-slate-300 mb-8">{statusMessage}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            {isSuccess ? (
              <Link href="/dashboard/orders" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold">
                  Ver Mis Pedidos
                </Button>
              </Link>
            ) : (
              <Link href="/checkout" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold">
                  Intentar Nuevamente
                </Button>
              </Link>
            )}

            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full border-white/20 text-slate-300 hover:bg-white/10 hover:text-white">
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}