const express = require('express');
const router = express.Router();
const { createProducto, getProductos, editProducto, deleteProducto } = require('../controllers/ProductController');

// Endpoint público para crear producto
router.post('/producto', createProducto);
router.get('/producto', getProductos);
router.put('/producto/:id', editProducto);
router.delete('/producto/:id', deleteProducto);

    
module.exports = router;
