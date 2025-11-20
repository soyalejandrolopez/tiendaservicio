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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Servicios</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dashboardData.servicesCount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Tickets</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dashboardData.ticketsCount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tickets Abiertos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dashboardData.openTicketsCount}</div>
                    </CardContent>
                </Card>
            </div>

            <DashboardCharts dashboardData={dashboardData} />
        </div>
    );
}
