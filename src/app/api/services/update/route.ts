import { NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const id = body.id as string;
    const title = body.title as string;
    const description = body.description as string;
    const price = parseFloat(body.price as string);
    const image_url = body.image_url as string;

    // Validar los datos
    if (!id || !title || !description || !price || !image_url) {
      return Response.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    const supabase = await createClient();

    // Actualizar el servicio en la base de datos
    const { error } = await supabase
      .from('services')
      .update({
        title,
        description,
        price,
        image_url,
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating service:', error);
      return Response.json({ error: 'Error al actualizar el servicio' }, { status: 500 });
    }

    // Devolvemos una respuesta que indica éxito
    return Response.json({ success: true, redirectUrl: '/admin/services' });
  } catch (error) {
    console.error('Error updating service:', error);
    return Response.json({ error: 'Error al actualizar el servicio' }, { status: 500 });
  }
}