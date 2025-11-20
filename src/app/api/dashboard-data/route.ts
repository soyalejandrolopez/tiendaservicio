import { NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Obtener servicios agrupados por mes
    const { data: services } = await supabase
      .from('services')
      .select('created_at')
      .gte('created_at', new Date(new Date().getFullYear(), 0, 1).toISOString()) // Desde enero del año actual
      .order('created_at', { ascending: true });

    // Obtener tickets agrupados por mes
    const { data: tickets } = await supabase
      .from('tickets')
      .select('created_at')
      .gte('created_at', new Date(new Date().getFullYear(), 0, 1).toISOString()) // Desde enero del año actual
      .order('created_at', { ascending: true });

    // Agrupar servicios por mes
    const servicesByMonth = groupByMonth(services || []);
    // Agrupar tickets por mes
    const ticketsByMonth = groupByMonth(tickets || []);

    // Obtener datos de estado de tickets
    const { count: openTicketsCount } = await supabase
      .from('tickets')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'open');

    const { count: inProgressTicketsCount } = await supabase
      .from('tickets')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'in_progress');

    const { count: closedTicketsCount } = await supabase
      .from('tickets')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'closed');

    // Obtener meses del año actual
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    // Crear datos para la gráfica mensual
    const monthlyData = months.map((name, index) => {
      return {
        name,
        services: servicesByMonth[index] || 0,
        tickets: ticketsByMonth[index] || 0
      };
    });

    // Datos de estado de tickets
    const ticketStatusData = [
      { name: 'Abiertos', value: openTicketsCount || 0 },
      { name: 'En Progreso', value: inProgressTicketsCount || 0 },
      { name: 'Cerrados', value: closedTicketsCount || 0 },
    ];

    return Response.json({ monthlyData, ticketStatusData });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return Response.json({ message: 'Error fetching dashboard data' }, { status: 500 });
  }
}

function groupByMonth(items: Array<{ created_at: string }>) {
  const counts = Array(12).fill(0); // Inicializar array con 12 meses (0-indexed)

  items.forEach(item => {
    const date = new Date(item.created_at);
    const monthIndex = date.getMonth(); // 0-indexed (ene=0, feb=1, etc.)
    counts[monthIndex]++;
  });

  return counts;
}