import { NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    // Verificar que es una imagen
    if (!file.type.startsWith('image/')) {
      return Response.json({ error: 'File must be an image' }, { status: 400 });
    }

    const supabase = await createClient();

    // Subir imagen a Supabase Storage - usando el bucket por defecto o uno conocido
    const fileName = `services/${Date.now()}-${file.name}`;

    // Intentar subir a varios posibles buckets
    const possibleBuckets = ['public', 'images', 'services', 'storage'];

    let uploadResult = null;
    let usedBucket = null;

    for (const bucket of possibleBuckets) {
      try {
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (!error) {
          uploadResult = data;
          usedBucket = bucket;
          break;
        }
      } catch (bucketError) {
        console.warn(`Upload to bucket '${bucket}' failed:`, bucketError);
        continue;
      }
    }

    if (!uploadResult || !usedBucket) {
      return Response.json({ error: 'Upload failed - no available storage bucket' }, { status: 500 });
    }

    // Obtener URL pública
    const { data: publicData } = supabase.storage
      .from(usedBucket)
      .getPublicUrl(uploadResult.path);

    return Response.json({ url: publicData.publicUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ error: 'Upload failed', details: (error as Error).message }, { status: 500 });
  }
}