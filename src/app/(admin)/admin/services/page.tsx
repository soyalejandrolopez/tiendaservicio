import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { PlusCircle, Trash2, Edit } from "lucide-react";

export const dynamic = 'force-dynamic';

async function deleteService(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const supabase = await createClient();
    await supabase.from("services").delete().eq("id", id);
    revalidatePath("/admin/services");
}

export default async function ManageServicesPage() {
    const supabase = await createClient();
    const { data: services } = await supabase.from("services").select("*").order("created_at", { ascending: false });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Gestionar Servicios</h1>
                <Link href="/admin/services/new">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Agregar Servicio
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border">
                <table className="w-full">
                    <thead className="border-b">
                        <tr>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[50px]">#</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Título</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Descripción</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Precio</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services?.map((service, index) => (
                            <tr key={service.id} className="border-b">
                                <td className="p-4 align-middle">{index + 1}</td>
                                <td className="p-4 align-middle font-medium">{service.title}</td>
                                <td className="p-4 align-middle text-sm text-muted-foreground max-w-xs truncate">{service.description}</td>
                                <td className="p-4 align-middle">${service.price}</td>
                                <td className="p-4 align-middle flex gap-2">
                                    <Link href={`/admin/services/${encodeURIComponent(service.id)}/edit`}>
                                        <Button variant="outline" size="sm" title="Editar servicio">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <form action={deleteService}>
                                        <input type="hidden" name="id" value={service.id} />
                                        <Button variant="destructive" size="sm" type="submit" title="Eliminar servicio">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
