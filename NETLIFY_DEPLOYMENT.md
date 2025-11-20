# Guía de Deployment en Netlify

## ✅ Estado Actual del Código

Todo el código necesario ya está en GitHub y listo para deployment:
- ✅ Next.js configurado correctamente para Netlify
- ✅ 18 páginas con renderizado dinámico (`force-dynamic`)
- ✅ Middleware configurado con manejo graceful
- ✅ Clientes de Supabase funcionando correctamente
- ✅ Build local exitoso

## 🚀 Pasos para Configurar Netlify

### Paso 1: Acceder al Dashboard de Netlify

1. Ve a: https://app.netlify.com
2. Inicia sesión con tu cuenta
3. Busca tu sitio: **voluble-cheesecake-a72281**

### Paso 2: Configurar Variables de Entorno

**⚠️ CRÍTICO: Sin estas variables, el sitio NO funcionará**

1. En el dashboard de tu sitio, ve a:
   - **Site configuration** → **Environment variables**

2. Haz clic en **"Add a variable"** o **"Add environment variables"**

3. Agrega las siguientes 3 variables **EXACTAMENTE como se muestran**:

#### Variable 1: NEXT_PUBLIC_SUPABASE_URL
```
Key: NEXT_PUBLIC_SUPABASE_URL
Value: https://epfkbqhmyepwnnwehvpe.supabase.co
Scopes: [✓] Production  [✓] Deploy Previews  [✓] Branch deploys
```

#### Variable 2: NEXT_PUBLIC_SUPABASE_ANON_KEY
```
Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwZmticWhteWVwd25ud2VodnBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MjQxOTYsImV4cCI6MjA3OTEwMDE5Nn0.c0dS_TWrT80T6ToWSP8rcAKgz3mj1Scx23amG3DYT2w
Scopes: [✓] Production  [✓] Deploy Previews  [✓] Branch deploys
```

#### Variable 3: SUPABASE_SERVICE_ROLE_KEY
```
Key: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwZmticWhteWVwd25ud2VodnBlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzUyNDE5NiwiZXhwIjoyMDc5MTAwMTk2fQ.vTk7Ku44ljN-d-u48YJc_eubQ-lvyD9OdpTuCa1OTIA
Scopes: [✓] Production  [✓] Deploy Previews  [✓] Branch deploys
```

4. **Guarda** cada variable después de agregarla

### Paso 3: Activar el Redeploy

Después de agregar todas las variables:

1. Ve a **Deploys** en el menú principal
2. Haz clic en **"Trigger deploy"** → **"Deploy site"**
3. Espera a que el deploy se complete (generalmente 2-4 minutos)

### Paso 4: Verificar el Deployment

Una vez completado el deploy:

1. Ve a tu sitio: https://voluble-cheesecake-a72281.netlify.app/
2. Verifica que:
   - ✅ La página principal carga correctamente
   - ✅ Los servicios se muestran (datos de Supabase)
   - ✅ Puedes hacer login/registro
   - ✅ El dashboard funciona

## 🔧 Variables Opcionales de Wompi (Para Pagos)

Si quieres activar los pagos, también agrega estas variables:

```
NEXT_PUBLIC_WOMPI_PUBLIC_KEY=pub_prod_H9xoJnh8Prqr7PHDTwgTMMY2KzT6lrag
WOMPI_PRIVATE_KEY=prv_prod_lBo65A6Gzqd4bz971UY4FN352Fpx3It7
WOMPI_MERCHANT_ID=prod_events_Z3HFXQliMlfY1azf8wGfZlfl32EHIewx
NEXT_PUBLIC_WOMPI_MERCHANT_ID=prod_integrity_gTCwAEmGZ5Hz0kwkiT9fGF5RethPGxIn
WOMPI_ENVIRONMENT=production
WOMPI_INTEGRITY_SECRET=prod_integrity_gTCwAEmGZ5Hz0kwkiT9fGF5RethPGxIn
```

## ❓ Problemas Comunes

### El build falla con "Missing Supabase URL"
- Verifica que agregaste las 3 variables de Supabase
- Asegúrate de que los nombres están escritos EXACTAMENTE igual
- Verifica que las variables están habilitadas para "Production"

### El sitio carga pero no muestra servicios
- Las variables de entorno están mal configuradas
- Revisa los logs en Netlify: Deploys → [último deploy] → Deploy log

### Error 404 en algunas páginas
- Limpia el cache de Netlify: Site configuration → Build & deploy → Clear cache and deploy site

## 📝 Notas Importantes

- Las variables `NEXT_PUBLIC_*` son visibles en el navegador
- La variable `SUPABASE_SERVICE_ROLE_KEY` solo se usa en el servidor
- Netlify redeployará automáticamente cuando cambies las variables de entorno
- Cada push a GitHub activará un nuevo deploy automático

## ✅ Checklist Final

- [ ] Agregué NEXT_PUBLIC_SUPABASE_URL
- [ ] Agregué NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] Agregué SUPABASE_SERVICE_ROLE_KEY
- [ ] Activé el redeploy
- [ ] El sitio carga correctamente
- [ ] La autenticación funciona
- [ ] Los datos de Supabase se muestran

---

**¡Listo! Tu aplicación debería estar funcionando en producción.** 🎉
