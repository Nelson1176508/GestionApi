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
  origin: true,
  credentials: true
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
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

module.exports = app;