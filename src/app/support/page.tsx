import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export const dynamic = 'force-dynamic';

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
        <div className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4">
            <Card className="w-full max-w-2xl mx-auto glass-card border-white/10 bg-black/40 backdrop-blur-md">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl font-bold text-white font-playfair">Soporte - Crear Ticket</CardTitle>
                    <p className="text-slate-300">
                        ¿Necesitas ayuda? Envíanos un ticket y te responderemos pronto.
                    </p>
                </CardHeader>
                <CardContent>
                    <form action={submitGuestTicket} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="guest_name" className="text-sm font-medium text-slate-200">Nombre Completo</label>
                                <Input
                                    id="guest_name"
                                    name="guest_name"
                                    required
                                    placeholder="Tu nombre completo"
                                    className="bg-black/50 border-white/20 text-white placeholder:text-slate-500 focus-visible:ring-amber-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="guest_email" className="text-sm font-medium text-slate-200">Correo Electrónico</label>
                                <Input
                                    id="guest_email"
                                    name="guest_email"
                                    type="email"
                                    required
                                    placeholder="tu@email.com"
                                    className="bg-black/50 border-white/20 text-white placeholder:text-slate-500 focus-visible:ring-amber-500"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium text-slate-200">Asunto</label>
                            <Input
                                id="subject"
                                name="subject"
                                required
                                placeholder="Describe brevemente tu problema"
                                className="bg-black/50 border-white/20 text-white placeholder:text-slate-500 focus-visible:ring-amber-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="description" className="text-sm font-medium text-slate-200">Descripción</label>
                            <Textarea
                                id="description"
                                name="description"
                                required
                                placeholder="Proporciona más detalles sobre tu problema"
                                rows={6}
                                className="bg-black/50 border-white/20 text-white placeholder:text-slate-500 focus-visible:ring-amber-500 resize-none"
                            />
                        </div>
                        <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-6">
                            Enviar Ticket
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
