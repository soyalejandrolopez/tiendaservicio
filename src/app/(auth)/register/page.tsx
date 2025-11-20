import { signup } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface RegisterPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
    const params = await searchParams;
    const errorMessage = typeof params.error === 'string' ? params.error : '';

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Registrarse</CardTitle>
                    <CardDescription>
                        Crea una cuenta para comenzar
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
                        <Button formAction={signup} className="w-full">Registrarse</Button>
                        <p className="text-sm text-muted-foreground text-center">
                            ¿Ya tienes una cuenta?{" "}
                            <Link href="/login" className="underline">
                                Iniciar Sesión
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
