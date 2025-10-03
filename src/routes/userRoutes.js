const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// Rutas públicas
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Rutas protegidas
router.get('/profile', protect, userController.getUserProfile);
router.get('/', protect, admin, userController.getUsers);
router.delete('/:id', protect, admin, userController.deleteUser); // eliminar usuario por id
router.put('/:id', protect, admin, userController.editUser); // editar usuario por id

module.exports = router; 