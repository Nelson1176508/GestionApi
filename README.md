# ByGestionApis - API REST con Express.js y MongoDB

Una API REST robusta construida con Express.js y MongoDB Atlas, incluyendo autenticación JWT, validación de datos y mejores prácticas de seguridad.

## 🚀 Características

- **Express.js** - Framework web rápido y minimalista
- **MongoDB Atlas** - Base de datos en la nube
- **JWT Authentication** - Autenticación segura con tokens
- **Bcrypt** - Encriptación de contraseñas
- **Rate Limiting** - Protección contra ataques de fuerza bruta
- **CORS** - Configuración para Cross-Origin Resource Sharing
- **Helmet** - Seguridad HTTP headers
- **Mongoose** - ODM para MongoDB

## 📦 Instalación

1. **Clonar el repositorio:**
```bash
git clone <url-del-repositorio>
cd ByGestionApis
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
JWT_SECRET=tu_jwt_secret_aqui
API_VERSION=v1
```

4. **Iniciar la aplicación:**

Desarrollo (con nodemon):
```bash
npm run dev
```

Producción:
```bash
npm start
```

## 🛠️ Configuración de MongoDB Atlas

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crea un nuevo cluster
3. Configura el acceso a la base de datos (usuario y contraseña)
4. Obtén la cadena de conexión
5. Reemplaza `<username>`, `<password>` y `<database_name>` en tu archivo `.env`

## 📚 Endpoints de la API

### Usuarios

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/api/users/register` | Registrar nuevo usuario | No |
| POST | `/api/users/login` | Iniciar sesión | No |
| GET | `/api/users/profile` | Obtener perfil del usuario | Sí |
| GET | `/api/users` | Obtener todos los usuarios | Sí (Admin) |

### Ejemplo de uso

**Registrar usuario:**
```bash
POST /api/users/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456"
}
```

**Iniciar sesión:**
```bash
POST /api/users/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "123456"
}
```

**Obtener perfil (requiere token):**
```bash
GET /api/users/profile
Authorization: Bearer <tu-jwt-token>
```

## 🗂️ Estructura del Proyecto

```
ByGestionApis/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── User.js
│   └── routes/
│       └── userRoutes.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## 🔧 Scripts Disponibles

- `npm start` - Iniciar servidor en producción
- `npm run dev` - Iniciar servidor en desarrollo con nodemon

## 🔒 Seguridad

La API incluye las siguientes medidas de seguridad:

- **Rate Limiting**: Límite de 100 requests por IP cada 15 minutos
- **Helmet**: Configuración automática de headers de seguridad
- **CORS**: Configuración para permitir requests de dominios específicos
- **JWT**: Tokens seguros para autenticación
- **Bcrypt**: Encriptación de contraseñas con salt rounds

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC - mira el archivo [LICENSE](LICENSE) para más detalles.

## 🆘 Soporte

Si tienes algún problema o pregunta, por favor abre un issue en GitHub.