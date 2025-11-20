import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

async function submitGuestTicket(formData: FormData) {
    "use server";

    const guest_name = formData.get("guest_name") as string;
    const guest_email = formData.get("guest_email") as string;
    const subject = formData.get("subject") as string;
    const description = formData.get("description") as string;

    const supabase = await createClient();

    await supabase.from("tickets").insert({
        guest_name,
        guest_email,
        subject,
        description,
    });

    redirect("/support/success");
}

export default function SupportPage() {
    return (
        <div className="container py-12">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Soporte - Crear Ticket</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        ¿Necesitas ayuda? Envíanos un ticket y te responderemos pronto.
                    </p>
                </CardHeader>
                <CardContent>
                    <form action={submitGuestTicket} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="guest_name">Nombre Completo</label>
                            <Input 
                                id="guest_name" 
                                name="guest_name" 
                                required 
                                placeholder="Tu nombre completo"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="guest_email">Correo Electrónico</label>
                            <Input 
                                id="guest_email" 
                                name="guest_email" 
                                type="email" 
                                required 
                                placeholder="tu@email.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="subject">Asunto</label>
                            <Input 
                                id="subject" 
                                name="subject" 
                                required 
                                placeholder="Describe brevemente tu problema"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="description">Descripción</label>
                            <Textarea 
                                id="description" 
                                name="description" 
                                required 
                                placeholder="Proporciona más detalles sobre tu problema"
                                rows={6}
                            />
                        </div>
                        <Button type="submit" className="w-full">Enviar Ticket</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
