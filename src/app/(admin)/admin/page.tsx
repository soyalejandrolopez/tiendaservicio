import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import DashboardCharts from "@/components/admin/dashboard-charts";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const supabase = await createClient();

    const { count: servicesCount } = await supabase
        .from("services")
        .select("*", { count: "exact", head: true });

    const { count: ticketsCount } = await supabase
        .from("tickets")
        .select("*", { count: "exact", head: true });

    const { count: openTicketsCount } = await supabase
        .from("tickets")
        .select("*", { count: "exact", head: true })
        .eq("status", "open");

    const dashboardData = {
        servicesCount: servicesCount || 0,
        ticketsCount: ticketsCount || 0,
        openTicketsCount: openTicketsCount || 0
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white font-playfair">Resumen General</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="glass-card bg-black/40 backdrop-blur-md border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-300">Total de Servicios</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{dashboardData.servicesCount}</div>
                    </CardContent>
                </Card>
                <Card className="glass-card bg-black/40 backdrop-blur-md border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-300">Total de Tickets</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{dashboardData.ticketsCount}</div>
                    </CardContent>
                </Card>
                <Card className="glass-card bg-black/40 backdrop-blur-md border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-300">Tickets Abiertos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{dashboardData.openTicketsCount}</div>
                    </CardContent>
                </Card>
            </div>

            <DashboardCharts dashboardData={dashboardData} />
        </div>
    );
}
