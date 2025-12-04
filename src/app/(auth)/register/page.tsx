import { signup } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const dynamic = 'force-dynamic';

interface RegisterPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
    const params = await searchParams;
    const errorMessage = typeof params.error === 'string' ? params.error : '';
    const returnUrl = typeof params.returnUrl === 'string' ? params.returnUrl : '';

    return (
        <div className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4">
            <Card className="w-full max-w-md mx-auto glass-card border-white/10 bg-black/40 backdrop-blur-md">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl font-bold text-white font-playfair">Registrarse</CardTitle>
                    <CardDescription className="text-slate-300">
                        Crea una cuenta para comenzar
                    </CardDescription>
                </CardHeader>
                <form>
                    <input type="hidden" name="returnUrl" value={returnUrl} />
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-slate-200">Correo Electrónico</label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="m@ejemplo.com"
                                className="bg-black/50 border-white/20 text-white placeholder:text-slate-500 focus-visible:ring-amber-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-slate-200">Contraseña</label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="bg-black/50 border-white/20 text-white placeholder:text-slate-500 focus-visible:ring-amber-500"
                            />
                        </div>
                        {errorMessage && (
                            <div className="text-red-400 text-sm p-3 bg-red-900/20 border border-red-900/50 rounded">
                                {errorMessage}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button formAction={signup} className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-5">
                            Registrarse
                        </Button>
                        <p className="text-sm text-slate-400 text-center">
                            ¿Ya tienes una cuenta?{" "}
                            <Link href={`/login${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''}`} className="text-amber-400 hover:text-amber-300 underline transition-colors">
                                Iniciar Sesión
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
