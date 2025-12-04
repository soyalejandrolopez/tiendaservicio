import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import { formatPrice } from "@/lib/format";

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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white font-playfair">Gestionar Servicios</h1>
                <Link href="/admin/services/new">
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 shadow-lg shadow-orange-500/20">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Agregar Servicio
                    </Button>
                </Link>
            </div>

            <div className="rounded-xl border border-white/10 glass-card bg-black/40 backdrop-blur-md overflow-hidden">
                <table className="w-full">
                    <thead className="border-b border-white/10 bg-white/5">
                        <tr>
                            <th className="h-12 px-6 text-left align-middle font-medium text-slate-300 w-[50px]">#</th>
                            <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Título</th>
                            <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Descripción</th>
                            <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Precio</th>
                            <th className="h-12 px-6 text-left align-middle font-medium text-slate-300">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services?.map((service, index) => (
                            <tr key={service.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                                <td className="p-6 align-middle text-white/70">{index + 1}</td>
                                <td className="p-6 align-middle font-medium text-white">{service.title}</td>
                                <td className="p-6 align-middle text-sm text-slate-300 max-w-xs truncate">{service.description}</td>
                                <td className="p-6 align-middle text-amber-400 font-medium">${formatPrice(service.price)}</td>
                                <td className="p-6 align-middle flex gap-2">
                                    <Link href={`/admin/services/${encodeURIComponent(service.id)}/edit`}>
                                        <Button variant="ghost" size="sm" className="text-amber-400 hover:text-amber-300 hover:bg-amber-400/10" title="Editar servicio">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <form action={deleteService}>
                                        <input type="hidden" name="id" value={service.id} />
                                        <Button variant="ghost" size="sm" type="submit" className="text-red-400 hover:text-red-300 hover:bg-red-400/10" title="Eliminar servicio">
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
