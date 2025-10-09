require('dotenv').config(); // <-- Agrega esto en la primera línea

const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRouters = require('./routes/ProductRouters');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json'); // Asegúrate de crear este archivo
const mongoose = require('mongoose');
const cors = require('cors'); // <-- Agrega esta línea

// Configura CORS para permitir peticiones desde cualquier origen
app.use(cors({
  origin: true, // Permite TODOS los orígenes temporalmente
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token', 'Access-Control-Allow-Origin'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(express.json({ limit: '10mb' }));  // aumenta el límite, puedes ajustar a 20mb si lo necesitas
app.use('/api/users', userRoutes);  
app.use('/api', categoryRoutes);
app.use('/api', productRouters);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoint raíz opcional
app.get('/', (req, res) => {
  res.send('API funcionando');
}); 

const PORT = process.env.PORT || 3000;

// Conectar a MongoDB antes de iniciar el servidor
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB conectado exitosamente');
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
      console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;