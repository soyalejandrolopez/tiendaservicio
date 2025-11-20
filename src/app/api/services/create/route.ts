import { NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const title = body.title as string;
    const description = body.description as string;
    const price = parseFloat(body.price as string);
    const image_url = body.image_url as string;

    // Validar los datos
    if (!title || !description || !price || !image_url) {
      return Response.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    const supabase = await createClient();

    // Insertar el servicio en la base de datos
    const { error } = await supabase
      .from('services')
      .insert([{
        title,
        description,
        price,
        image_url, // Ahora es un data URL base64 o URL real
      }]);

    if (error) {
      console.error('Error inserting service:', error);
      return Response.json({ error: 'Error al crear el servicio' }, { status: 500 });
    }

    // Devolvemos una respuesta que indica éxito
    return Response.json({ success: true, redirectUrl: '/admin/services' });
  } catch (error) {
    console.error('Error creating service:', error);
    return Response.json({ error: 'Error al crear el servicio' }, { status: 500 });
  }
}