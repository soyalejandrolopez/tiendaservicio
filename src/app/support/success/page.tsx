import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
    return (
        <div className="container py-12">
            <Card className="max-w-md mx-auto text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>
                    <CardTitle>¡Ticket Enviado!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Tu ticket ha sido enviado exitosamente. Nuestro equipo lo revisará y te contactará pronto por correo electrónico.
                    </p>
                    <Link href="/">
                        <Button className="w-full">Volver al Inicio</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
