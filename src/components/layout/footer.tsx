import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Mail, MapPin, Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-white/10 bg-slate-950 text-slate-300 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

            <div className="container relative z-10 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="space-y-6 flex flex-col items-center text-center">
                        <Link href="/" className="flex flex-col items-center">
                            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-100 to-amber-200 font-playfair">
                                Servicios Digitales
                            </span>
                            <span className="block text-sm font-light text-slate-400 tracking-widest uppercase mt-1">
                                Popayán
                            </span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed text-sm max-w-xs mx-auto">
                            Transformando el futuro digital de Popayán y el Cauca con soluciones de Inteligencia Artificial y desarrollo web de vanguardia.
                        </p>
                        <div className="flex gap-4 justify-center">
                            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-300 group">
                                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6 flex flex-col items-center text-center">
                        <h3 className="text-lg font-semibold text-white">Enlaces Rápidos</h3>
                        <ul className="space-y-3 w-full flex flex-col items-center">
                            {[
                                { label: "Inicio", href: "/" },
                                { label: "Servicios", href: "/services" },
                                { label: "Portafolio", href: "/portfolio" },
                                { label: "Nosotros", href: "/about" },
                                { label: "Soporte", href: "/support" },
                            ].map((link) => (
                                <li key={link.label} className="flex justify-center w-full">
                                    <Link href={link.href} className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2 group justify-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50 group-hover:bg-amber-400 transition-colors" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6 flex flex-col items-center text-center">
                        <h3 className="text-lg font-semibold text-white">Contacto</h3>
                        <ul className="space-y-4 w-full">
                            <li className="flex items-start gap-3 text-sm text-slate-400 justify-center">
                                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                <span>Centro Histórico<br />Popayán, Cauca, Colombia</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-400 justify-center">
                                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                                <span>+57 (300) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-400 justify-center">
                                <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                                <span>contacto@serviciosdigitales.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6 flex flex-col items-center text-center">
                        <h3 className="text-lg font-semibold text-white">Boletín</h3>
                        <p className="text-sm text-slate-400">
                            Suscríbete para recibir las últimas novedades en tecnología e IA.
                        </p>
                        <form className="space-y-3 w-full max-w-xs">
                            <Input
                                type="email"
                                placeholder="Tu correo electrónico"
                                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:ring-amber-500/20 text-center"
                            />
                            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0">
                                Suscribirse
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col items-center justify-center gap-4 text-center">
                    <p className="text-xs text-slate-500">
                        © {currentYear} Servicios Digitales Popayán. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-6 text-xs text-slate-500 justify-center">
                        <Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacidad</Link>
                        <Link href="/terms" className="hover:text-amber-400 transition-colors">Términos</Link>
                        <Link href="/cookies" className="hover:text-amber-400 transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
