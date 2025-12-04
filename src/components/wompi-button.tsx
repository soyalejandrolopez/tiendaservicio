"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface WompiButtonProps {
    price: number;
    title: string;
}

export default function WompiButton({ price, title }: WompiButtonProps) {
    const [signature, setSignature] = useState<string>("");
    const [reference] = useState(`REF-${Date.now()}`);
    const [loading, setLoading] = useState(true);
    const scriptLoaded = useRef(false);

    useEffect(() => {
        async function getSignature() {
            try {
                const response = await fetch('/api/wompi', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ price, reference })
                });
                const data = await response.json();
                setSignature(data.signature);
                setLoading(false);
            } catch (error) {
                console.error('Error getting signature:', error);
                setLoading(false);
            }
        }
        getSignature();
    }, [price, reference]);

    useEffect(() => {
        if (!signature || scriptLoaded.current) return;

        const container = document.getElementById("wompi-container");
        if (!container) return;

        const script = document.createElement("script");
        script.src = "https://checkout.wompi.co/widget.js";
        script.setAttribute("data-render", "button");
        script.setAttribute("data-public-key", process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY || "");
        script.setAttribute("data-currency", "COP");
        script.setAttribute("data-amount-in-cents", (price * 100).toString());
        script.setAttribute("data-reference", reference);
        script.setAttribute("data-signature:integrity", signature);
        script.setAttribute("data-redirect-url", `${window.location.origin}/payment/result`);

        container.appendChild(script);
        scriptLoaded.current = true;
    }, [signature, price, reference]);

    if (loading) {
        return (
            <Button disabled className="w-full h-14 bg-slate-800 text-slate-400">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Preparando pago...
            </Button>
        );
    }

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                #wompi-container form button {
                    width: 100% !important;
                    padding: 16px 24px !important;
                    font-size: 18px !important;
                    font-weight: 600 !important;
                    border-radius: 8px !important;
                    min-height: 56px !important;
                    background: linear-gradient(to right, #f59e0b, #ea580c) !important;
                    border: none !important;
                    color: white !important;
                    cursor: pointer !important;
                    transition: all 0.3s ease !important;
                }
                #wompi-container form button:hover {
                    transform: scale(1.02) !important;
                    box-shadow: 0 10px 15px -3px rgba(234, 88, 12, 0.3) !important;
                }
            `}} />
            <div id="wompi-container" className="w-full">
                {/* The script will inject the button here */}
            </div>
        </>
    );
}
