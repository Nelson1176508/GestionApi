require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Importar rutas
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests por ventana de tiempo
  message: 'Demasiadas peticiones desde esta IP, por favor intenta más tarde.'
});

// Middlewares
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
  })
  .catch((error) => {
    console.error('❌ Error conectando a MongoDB:', error);
  });

// Rutas
app.get('/', (req, res) => {
  res.json({
    message: '🚀 API funcionando correctamente',
    version: process.env.API_VERSION || 'v1',
    timestamp: new Date().toISOString()
  });
});

// Usar rutas
app.use('/api/users', userRoutes);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Algo salió mal!',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🌟 Servidor corriendo en puerto ${PORT}`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
});