# Configuración para Railway

## Pasos para configurar tu API en Railway:

### 1. Variables de Entorno en Railway
En el dashboard de Railway, ve a tu proyecto y añade estas variables:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
JWT_SECRET=tu_jwt_secret_super_seguro
```

### 2. Configurar CORS en tu Frontend
En tu aplicación web, asegúrate de que esté usando la URL de Railway en lugar de localhost:

```javascript
// Cambiar de:
const API_URL = 'http://localhost:3000';

// A:
const API_URL = 'https://tu-app-railway.up.railway.app';
```

### 3. Verificar el Despliegue
Una vez desplegado, puedes verificar que funciona visitando:
- `https://tu-app-railway.up.railway.app/` - Debería mostrar "API funcionando"
- `https://tu-app-railway.up.railway.app/api-docs` - Documentación Swagger

### 4. Problemas Comunes y Soluciones:

#### Error de CORS:
- Actualiza la configuración de CORS en `src/index.js` con tu dominio real
- Cambia `'https://your-frontend-domain.com'` por la URL real de tu frontend

#### Error de conexión a MongoDB:
- Verifica que `MONGODB_URI` esté correctamente configurado en Railway
- Asegúrate de que tu IP esté en la whitelist de MongoDB Atlas (0.0.0.0/0 para permitir todas)

#### Error de JWT:
- Configura `JWT_SECRET` en Railway con una clave segura

### 5. URL de tu API en Railway:
Railway te dará una URL como: `https://tu-proyecto-production.up.railway.app`

Usa esta URL en tu frontend para hacer las peticiones a la API.