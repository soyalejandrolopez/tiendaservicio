"use client";

import { useState, useRef, FormEvent, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
}

export default function EditServiceWithUpload({ service }: { service: Service }) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(service.image_url || null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(service.image_url || '');
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen');
        return;
      }
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      
      setUploading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
          setUploading(false);
        }
      };
      reader.onerror = () => {
        alert('Error al leer la imagen');
        setUploading(false);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificar que tengamos todos los datos necesarios
    if (!imageUrl) {
      alert('Por favor sube una imagen');
      return;
    }

    const form = e.currentTarget;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
    const price = parseFloat((form.elements.namedItem('price') as HTMLInputElement).value);

    if (!title || !description || !price) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Enviar los datos al backend
    try {
      const response = await fetch('/api/services/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: service.id,
          title,
          description,
          price,
          image_url: imageUrl
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Redirigir a la página de servicios
        router.push('/admin/services');
        router.refresh(); // Actualizar para mostrar el servicio actualizado
      } else {
        alert('Error al actualizar el servicio: ' + result.error);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Error al actualizar el servicio');
    }
  };

  // No renderizar nada durante la hidratación del servidor
  if (!isClient) {
    return (
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Editar Servicio: {service.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Cargando...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Editar Servicio: {service.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="id" value={service.id} />
          <div className="space-y-2">
            <label htmlFor="title">Título</label>
            <Input
              id="title"
              name="title"
              required
              placeholder="Título del servicio"
              defaultValue={service.title}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              placeholder="Descripción detallada del servicio"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue={service.description}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="price">Precio</label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              required
              placeholder="0.00"
              defaultValue={service.price}
            />
          </div>

          <div className="space-y-2">
            <label>Seleccionar Nueva Imagen {uploading && '(Cargando...)'}</label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </div>

          {previewUrl && (
            <div className="space-y-2">
              <label>Previsualización</label>
              <div>
                <img
                  src={previewUrl}
                  alt="Previsualización"
                  className="max-h-40 object-contain border rounded"
                />
              </div>
            </div>
          )}

          {imageUrl && !imageUrl.startsWith('http') && (
            <div className="space-y-2">
              <label>Imagen Cargada</label>
              <Input
                type="text"
                value={imageUrl.substring(0, 50) + '...'}
                readOnly
                className="bg-muted"
              />
            </div>
          )}

          <Button type="submit" disabled={uploading}>
            Actualizar Servicio
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}