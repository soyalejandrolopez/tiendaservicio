"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { activateOrder } from "@/app/(admin)/actions";
import { Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface OrderActivationFormProps {
    orderId: string;
    currentActivationUrl?: string;
    currentCredentials?: string;
    isCompleted: boolean;
}

export default function OrderActivationForm({
    orderId,
    currentActivationUrl = "",
    currentCredentials = "",
    isCompleted
}: OrderActivationFormProps) {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        const result = await activateOrder(formData);
        setLoading(false);

        if (result?.error) {
            toast.error("Error al activar el servicio");
        } else {
            toast.success("Servicio activado correctamente");
        }
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            <input type="hidden" name="orderId" value={orderId} />

            <div className="space-y-2">
                <Label htmlFor="activationUrl" className="text-white">URL de Activación / Acceso</Label>
                <Input
                    id="activationUrl"
                    name="activationUrl"
                    placeholder="https://ejemplo.com/acceso"
                    defaultValue={currentActivationUrl}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="serviceCredentials" className="text-white">Credenciales / Instrucciones</Label>
                <Textarea
                    id="serviceCredentials"
                    name="serviceCredentials"
                    placeholder="Usuario: admin&#10;Contraseña: 12345&#10;Instrucciones adicionales..."
                    defaultValue={currentCredentials}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-[120px]"
                />
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
            >
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Activando...
                    </>
                ) : (
                    <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        {isCompleted ? "Actualizar Activación" : "Activar Servicio"}
                    </>
                )}
            </Button>
        </form>
    );
}
