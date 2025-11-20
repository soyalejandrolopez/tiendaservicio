"use client";

import { useEffect, useState, useRef } from "react";

interface WompiButtonProps {
    price: number;
    title: string;
}

export default function WompiButton({ price, title }: WompiButtonProps) {
    const [signature, setSignature] = useState<string>("");
    const [reference] = useState(`REF-${Date.now()}`);
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
            } catch (error) {
                console.error('Error getting signature:', error);
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

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `
                #wompi-container form button {
                    width: 100% !important;
                    padding: 16px 24px !important;
                    font-size: 18px !important;
                    font-weight: 600 !important;
                    border-radius: 8px !important;
                    min-height: 56px !important;
                }
            `}} />
            <div id="wompi-container" className="w-full">
                {/* The script will inject the button here */}
            </div>
        </>
    );
}
