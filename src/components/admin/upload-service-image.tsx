"use client";

import { useState, useRef, FormEvent, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function AddServiceWithUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
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
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Por favor selecciona una imagen primero');
      return;
    }

    setUploading(true);

    // Convertir la imagen a base64
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImageUrl(event.target.result as string);
        alert('Imagen cargada exitosamente');
        setUploading(false);
      }
    };

    reader.onerror = () => {
      alert('Error al leer la imagen');
      setUploading(false);
    };

    reader.readAsDataURL(file);
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
      const response = await fetch('/api/services/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
        router.refresh(); // Actualizar para mostrar el nuevo servicio
      } else {
        alert('Error al crear el servicio: ' + result.error);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Error al crear el servicio');
    }
  };

  // No renderizar nada durante la hidratación del servidor
  if (!isClient) {
    return (
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Agregar Nuevo Servicio</CardTitle>
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
        <CardTitle>Agregar Nuevo Servicio</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title">Título</label>
            <Input id="title" name="title" required placeholder="Título del servicio" />
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
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="price">Precio</label>
            <Input id="price" name="price" type="number" step="0.01" required placeholder="0.00" />
          </div>

          <div className="space-y-2">
            <label>Seleccionar Imagen</label>
            <div className="flex flex-col gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                onClick={handleUpload}
                disabled={!file || uploading}
              >
                {uploading ? 'Cargando...' : 'Cargar Imagen'}
              </Button>
            </div>
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

          {imageUrl && (
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

          <Button type="submit" disabled={uploading || !imageUrl}>
            Agregar Servicio
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}