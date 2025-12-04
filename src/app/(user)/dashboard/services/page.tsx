import { createClient } from "@/utils/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { ArrowRight, Star } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function DashboardServicesPage() {
    const supabase = await createClient();
    const { data: services } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white font-playfair">Servicios Disponibles</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {services?.map((service) => (
                    <Card key={service.id} className="glass-card bg-black/40 backdrop-blur-md border-white/10 overflow-hidden group hover:border-amber-500/30 transition-all duration-300">
                        <div className="aspect-video relative overflow-hidden">
                            <Image
                                src={service.image_url || "/placeholder.svg"}
                                alt={service.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                <div className="flex items-center gap-1 text-amber-400 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
                                    <Star className="w-3 h-3 fill-current" />
                                    <span className="text-xs font-bold">4.8</span>
                                </div>
                                <span className="text-xl font-bold text-white drop-shadow-lg">
                                    ${formatPrice(service.price)}
                                </span>
                            </div>
                        </div>
                        <CardContent className="p-5 space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-amber-400 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>

                            <Link href={`/checkout?serviceId=${service.id}`} className="block">
                                <Button className="w-full bg-white/10 hover:bg-amber-500 hover:text-white text-white border border-white/10 hover:border-amber-500/50 transition-all duration-300 group/btn">
                                    Comprar Ahora
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
