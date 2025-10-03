const express = require('express');
const router = express.Router();
const {
  createCategoria,
  getCategorias,
  editCategoria,
  deleteCategoria
} = require('../controllers/ProductController');

// Endpoint público para crear categoría
router.post('/categoria', createCategoria);

// Endpoint público para obtener todas las categorías
router.get('/categorias', getCategorias);

// Endpoint para editar categoría por id
router.put('/categoria/:id', editCategoria);

// Endpoint para eliminar categoría por id
router.delete('/categoria/:id', deleteCategoria);

module.exports = router;
