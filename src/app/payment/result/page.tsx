import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function PaymentResultPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const status = searchParams.status as string | undefined;

  let statusTitle = "Procesando Pago";
  let statusMessage = "Tu pago está siendo procesado. Por favor espera...";
  let statusIcon = <Clock className="h-16 w-16 text-yellow-500 mx-auto mb-4" />;
  let statusColor = "text-yellow-600";

  if (status === "success") {
    statusTitle = "¡Pago Exitoso!";
    statusMessage = "Gracias por tu compra. Tu servicio será procesado en breve.";
    statusIcon = <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />;
    statusColor = "text-green-600";
  } else if (status === "failed") {
    statusTitle = "Pago Fallido";
    statusMessage = "Tu pago no pudo ser procesado. Por favor intenta de nuevo o contacta al soporte.";
    statusIcon = <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />;
    statusColor = "text-red-600";
  }

  return (
    <div className="container py-12 flex flex-col items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className={statusColor}>{statusIcon}</div>
          <CardTitle className={statusColor}>{statusTitle}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">{statusMessage}</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Link href="/" className="flex-1">
              <Button variant="outline">Volver al Inicio</Button>
            </Link>
            <Link href="/services" className="flex-1">
              <Button>Ver Servicios</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}