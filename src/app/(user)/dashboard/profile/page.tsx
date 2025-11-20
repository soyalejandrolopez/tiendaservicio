import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { revalidatePath } from "next/cache";

async function updateProfile(formData: FormData) {
    "use server";

    const full_name = formData.get("full_name") as string;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { error } = await supabase
        .from("profiles")
        .update({ full_name })
        .eq("id", user.id);

    if (error) {
        console.error("Error updating profile:", error);
    }

    revalidatePath("/dashboard/profile");
    redirect("/dashboard/profile");
}

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    return (
        <div className="container py-12">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Mi Perfil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Correo Electrónico</label>
                        <Input value={profile?.email || ""} disabled className="bg-muted" />
                    </div>

                    <form action={updateProfile} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="full_name" className="text-sm font-medium">Nombre Completo</label>
                            <Input 
                                id="full_name" 
                                name="full_name" 
                                defaultValue={profile?.full_name || ""} 
                                placeholder="Ingresa tu nombre completo"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Rol</label>
                            <Input value={profile?.role === "admin" ? "Administrador" : "Usuario"} disabled className="bg-muted" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Fecha de Registro</label>
                            <Input value={new Date(profile?.created_at).toLocaleDateString("es-ES")} disabled className="bg-muted" />
                        </div>

                        <Button type="submit">Actualizar Perfil</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
