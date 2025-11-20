import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import UserDashboardCharts from "@/components/user/user-dashboard-charts";

export const dynamic = 'force-dynamic';

export default async function UserDashboard() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Get user's tickets count
    const { count: userTicketsCount } = await supabase
        .from("tickets")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user?.id);

    // Get open tickets count for this user
    const { count: openUserTicketsCount } = await supabase
        .from("tickets")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user?.id)
        .eq("status", "open");

    // Get user profile info
    const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user?.id)
        .single();

    const dashboardData = {
        userTicketsCount: userTicketsCount || 0,
        openUserTicketsCount: openUserTicketsCount || 0,
        userName: profile?.full_name || 'Usuario'
    };

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">¡Bienvenido de nuevo, {profile?.full_name || 'Usuario'}!</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Mis Tickets</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dashboardData.userTicketsCount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tickets Abiertos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dashboardData.openUserTicketsCount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Estado de Cuenta</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Activo</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Actividad Reciente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Tus últimos tickets y actualizaciones de servicios aparecerán aquí.</p>
                    </CardContent>
                </Card>
            </div>

            <UserDashboardCharts dashboardData={dashboardData} />
        </div>
    );
}