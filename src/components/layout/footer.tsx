import Link from "next/link"

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-background">
            <div className="container flex flex-col items-center justify-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground">
                        © {currentYear} alejandrotech servicios. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    )
}
