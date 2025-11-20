import { login } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const dynamic = 'force-dynamic';

interface LoginPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
    const errorMessage = typeof searchParams.error === 'string' ? searchParams.error : '';

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Iniciar Sesión</CardTitle>
                    <CardDescription>
                        Ingresa tu correo electrónico a continuación para iniciar sesión en tu cuenta
                    </CardDescription>
                </CardHeader>
                <form>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email">Correo Electrónico</label>
                            <Input id="email" name="email" type="email" required placeholder="m@ejemplo.com" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password">Contraseña</label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        {errorMessage && (
                            <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                                {errorMessage}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button formAction={login} className="w-full">Iniciar Sesión</Button>
                        <p className="text-sm text-muted-foreground text-center">
                            ¿No tienes una cuenta?{" "}
                            <Link href="/register" className="underline">
                                Registrarse
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
