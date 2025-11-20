import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

async function submitTicket(formData: FormData) {
    "use server";

    const subject = formData.get("subject") as string;
    const description = formData.get("description") as string;

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    await supabase.from("tickets").insert({
        user_id: user.id,
        subject,
        description,
    });

    redirect("/dashboard/tickets");
}

export default function NewTicketPage() {
    return (
        <div className="container py-12">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Crear Nuevo Ticket</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={submitTicket} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="subject">Asunto</label>
                            <Input id="subject" name="subject" required placeholder="Describe brevemente tu problema" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="description">Descripción</label>
                            <Textarea id="description" name="description" required placeholder="Proporciona más detalles sobre tu problema" rows={6} />
                        </div>
                        <Button type="submit">Enviar Ticket</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
