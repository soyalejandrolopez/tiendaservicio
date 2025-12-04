"use client";

import { usePathname } from "next/navigation";

export default function ConditionalLayout({
    children,
    navbar,
    footer,
}: {
    children: React.ReactNode;
    navbar: React.ReactNode;
    footer: React.ReactNode;
}) {
    const pathname = usePathname();
    const isDashboardOrAdmin = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");

    return (
        <>
            {!isDashboardOrAdmin && navbar}
            <div className={`flex-1 w-full flex flex-col ${!isDashboardOrAdmin ? "pt-16" : ""}`}>
                {children}
            </div>
            {!isDashboardOrAdmin && footer}
        </>
    );
}
