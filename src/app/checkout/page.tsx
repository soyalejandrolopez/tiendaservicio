import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Shield, Lock, User } from "lucide-react";
import WompiButton from "@/components/wompi-button";
import { formatPrice } from "@/lib/format";
import { login, signup } from "@/app/(auth)/actions";

export const dynamic = 'force-dynamic';

interface CheckoutPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
    const params = await searchParams;
    const serviceId = params.serviceId as string;

    if (!serviceId) {
        redirect("/services");
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch service details
    const { data: service } = await supabase
        .from("services")
        .select("id, title, description, price, image_url")
        .eq("id", serviceId)
        .single();

    if (!service) {
        notFound();
    }

    return (
        <div className="min-h-screen py-12 md:py-16">
            <div className="container max-w-6xl mx-auto px-4">
                <Link
                    href={`/services/${service.id}`}
                    className="inline-flex items-center text-slate-300 hover:text-white mb-8 transition-colors text-sm font-medium group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Volver al Servicio
                </Link>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Service Summary */}
                    <div className="lg:col-span-7 space-y-6">
                        <h1 className="text-3xl font-playfair font-bold text-white mb-2">Resumen de tu Compra</h1>
                        <p className="text-slate-400 mb-6">Revisa los detalles de tu servicio antes de continuar.</p>

                        <Card className="bg-black/40 backdrop-blur-md border-white/10 overflow-hidden">
                            <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row">
                                    <div className="relative w-full md:w-48 h-48 md:h-auto">
                                        <Image
                                            src={service.image_url || "/placeholder.svg"}
                                            alt={service.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h2 className="text-xl font-bold text-white mb-2">{service.title}</h2>
                                            <p className="text-slate-300 text-sm line-clamp-2 mb-4">{service.description}</p>
                                            <ul className="space-y-2 mb-4">
                                                <li className="flex items-center text-xs text-slate-400">
                                                    <Check className="w-3 h-3 text-green-500 mr-2" />
                                                    Garantía de satisfacción
                                                </li>
                                                <li className="flex items-center text-xs text-slate-400">
                                                    <Shield className="w-3 h-3 text-amber-500 mr-2" />
                                                    Pago seguro SSL
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="flex items-baseline justify-between border-t border-white/10 pt-4 mt-2">
                                            <span className="text-slate-400 text-sm">Total a pagar:</span>
                                            <span className="text-2xl font-bold text-amber-400">${formatPrice(service.price)}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-4">
                            <div className="p-2 bg-blue-500/20 rounded-full">
                                <Lock className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-blue-400 font-bold text-sm mb-1">Pago 100% Seguro</h3>
                                <p className="text-blue-200/70 text-xs leading-relaxed">
                                    Tu transacción está protegida con encriptación de grado bancario. Procesamos los pagos a través de Wompi, la pasarela de pagos líder en Colombia.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Auth or Payment */}
                    <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                        <Card className="bg-black/60 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden">
                            <CardHeader className="border-b border-white/10 bg-white/5 pb-6">
                                <CardTitle className="text-xl text-white font-playfair flex items-center gap-2">
                                    <User className="w-5 h-5 text-amber-500" />
                                    {user ? "Información de Usuario" : "Inicia Sesión o Regístrate"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 md:p-8 space-y-6">
                                {user ? (
                                    <div className="space-y-6">
                                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                            <p className="text-sm text-slate-400 mb-1">Sesión iniciada como:</p>
                                            <p className="text-white font-medium truncate">{user.email}</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-300">Subtotal</span>
                                                <span className="text-white">${formatPrice(service.price)}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-300">Impuestos</span>
                                                <span className="text-white">$0</span>
                                            </div>
                                            <div className="flex items-center justify-between text-lg font-bold border-t border-white/10 pt-4">
                                                <span className="text-white">Total</span>
                                                <span className="text-amber-400">${formatPrice(service.price)}</span>
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <WompiButton price={Number(service.price)} title={service.title} />
                                            <p className="text-center text-xs text-slate-500 mt-4">
                                                Al hacer clic en pagar, aceptas nuestros términos y condiciones.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {/* Login Form */}
                                        <div className="space-y-4">
                                            <h3 className="text-white font-medium">Acceder a tu cuenta</h3>
                                            <form action={login} className="space-y-3">
                                                <Input
                                                    name="email"
                                                    type="email"
                                                    placeholder="Correo electrónico"
                                                    required
                                                    className="bg-black/50 border-white/20 text-white"
                                                />
                                                <Input
                                                    name="password"
                                                    type="password"
                                                    placeholder="Contraseña"
                                                    required
                                                    className="bg-black/50 border-white/20 text-white"
                                                />
                                                <Button type="submit" variant="secondary" className="w-full">
                                                    Iniciar Sesión
                                                </Button>
                                            </form>
                                        </div>

                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <span className="w-full border-t border-white/10" />
                                            </div>
                                            <div className="relative flex justify-center text-xs uppercase">
                                                <span className="bg-black px-2 text-slate-500">O crea una cuenta nueva</span>
                                            </div>
                                        </div>

                                        {/* Register Form */}
                                        <div className="space-y-4">
                                            <h3 className="text-white font-medium">Registrarse</h3>
                                            <form action={signup} className="space-y-3">
                                                <input type="hidden" name="returnUrl" value={`/checkout?serviceId=${serviceId}`} />
                                                <Input
                                                    name="email"
                                                    type="email"
                                                    placeholder="Correo electrónico"
                                                    required
                                                    className="bg-black/50 border-white/20 text-white"
                                                />
                                                <Input
                                                    name="password"
                                                    type="password"
                                                    placeholder="Contraseña"
                                                    required
                                                    className="bg-black/50 border-white/20 text-white"
                                                />
                                                <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold">
                                                    Registrarse y Continuar
                                                </Button>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
