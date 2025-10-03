const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const cloudinary = require('../utils/cloudinary');

// JWT generator
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Agregar esquema de validación para registro
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  surname: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().min(7).max(20).required(),
  address: Joi.string().allow('').optional(),
  // Acepta tanto valores en inglés como en español para mayor compatibilidad
  role: Joi.string().valid('Applicant', 'Postulante', 'Admin', 'Encargado', 'Vendedor', 'Manager', 'Seller').optional()
});

// Registrar Usuarios
const registerUser = async (req, res) => {
  // Saggler: Validate data before proceeding
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Invalid data',
      details: error.details.map(d => d.message)
    });
  }

  try {
    const { name, surname, email, password, phone, address, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    // Create user
    const user = await User.create({
      name,
      surname,
      email,
      password,
      phone,
      address: address || '',
      role: role || 'Applicant'
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
        phone: user.phone,
        address: user.address,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({
        message: 'Invalid user data'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// Logear Usuarios
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({
        message: 'Invalid credentials'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role
      });
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// Solicitar Usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users.map(user => ({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      photo: user.photo || ''
    })));
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// Eliminar Usuario
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor',
      error: error.message
    });
  }
};



// Editar Usuario
const editUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, surname, email, phone, address, role, photo } = req.body;

    let updateData = {};

    // Solo actualiza o crea los campos enviados en el body
    if (name !== undefined) updateData.name = name;
    if (surname !== undefined) updateData.surname = surname;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;
    if (role !== undefined) updateData.role = role;

    // Si se envía una foto (base64), súbela a Cloudinary y agrega el campo
    if (photo) {
      const result = await cloudinary.uploader.upload(photo, {
        folder: 'user_profiles'
      });
      updateData.photo = result.secure_url;
    }

    // Actualiza el usuario, si el campo no existe lo agrega
    const user = await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true, upsert: true });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      photo: user.photo
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor',
      error: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUserProfile,
  deleteUser,
  editUser
};

