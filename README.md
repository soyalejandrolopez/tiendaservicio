# Tienda Virtual de Servicios

Plataforma de comercio electrónico para servicios digitales con integración de pagos Wompi y gestión de tickets de soporte.

## 🚀 Características

- ✅ Catálogo de servicios digitales
- ✅ Sistema de autenticación con Supabase
- ✅ Panel de administración completo
- ✅ Dashboard de usuario
- ✅ Sistema de tickets de soporte (con y sin registro)
- ✅ Integración de pagos con Wompi
- ✅ Gestión de pedidos
- ✅ Diseño responsive con menú móvil tipo app
- ✅ Tema oscuro moderno

## 🛠️ Tecnologías

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Base de datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Pagos**: Wompi
- **Estilos**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Despliegue**: Netlify

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/soyalejandrolopez/tiendaservicio.git

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev
```

## 🌐 Demo en Vivo

**URL**: https://voluble-cheesecake-a72281.netlify.app/

## 📝 Variables de Entorno

```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
NEXT_PUBLIC_WOMPI_PUBLIC_KEY=tu_wompi_public_key
WOMPI_INTEGRITY_SECRET=tu_wompi_integrity_secret
NEXT_PUBLIC_BASE_URL=tu_url_de_produccion
```

## 👤 Roles de Usuario

- **Admin**: Acceso completo al panel de administración
- **User**: Acceso al dashboard de usuario y tickets
- **Guest**: Puede crear tickets sin registro

## 📄 Licencia

MIT

---

**Desarrollado con ❤️ por Alejandro López**
