const mongoose = require('mongoose');

// Modelo simple para categoría
const CategorySchema = new mongoose.Schema({
  categoria: { type: String, required: true }
});
const Category = mongoose.model('Category', CategorySchema);

// Endpoint para crear categoría
const createCategoria = async (req, res) => {
  try {
    const { categoria } = req.body;
    if (!categoria) {
      return res.status(400).json({ message: 'El campo categoria es requerido' });
    }
    // Verificar si la categoría ya existe (case-insensitive)
    const exists = await Category.findOne({ categoria: { $regex: `^${categoria}$`, $options: 'i' } });
    if (exists) {
      return res.status(400).json({ message: 'La categoría ya existe' });
    }
    const newCategory = await Category.create({ categoria });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor',
      error: error.message
    });
  }
};

const getCategorias = async (req, res) => {
  try {
    const categorias = await Category.find({});
    res.json(categorias);
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor',
      error: error.message
    });
  }
};

const editCategoria = async (req, res) => {
  try {
    const categoriaId = req.params.id;
    const { categoria } = req.body;
    if (!categoria) {
      return res.status(400).json({ message: 'El campo categoria es requerido' });
    }
    // Verificar si la nueva categoría ya existe (case-insensitive)
    const exists = await Category.findOne({ categoria: { $regex: `^${categoria}$`, $options: 'i' }, _id: { $ne: categoriaId } });
    if (exists) {
      return res.status(400).json({ message: 'La categoría ya existe' });
    }
    const updated = await Category.findByIdAndUpdate(categoriaId, { categoria }, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor',
      error: error.message
    });
  }
};

const deleteCategoria = async (req, res) => {
  try {
    const categoriaId = req.params.id;
    const deleted = await Category.findByIdAndDelete(categoriaId);
    if (!deleted) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json({ message: 'Categoría eliminada' });
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor',
      error: error.message
    });
  }
};

// Modelo simple para producto
const ProductSchema = new mongoose.Schema({
  NomProducto: { type: String, required: true },
  Categoria: { type: String, required: true }
});
const Product = mongoose.model('Product', ProductSchema);

// Endpoint para crear producto
const createProducto = async (req, res) => {
  try {
    const { NomProducto, Categoria } = req.body;
    if (!NomProducto || !Categoria) {
      return res.status(400).json({ message: 'NomProducto y Categoria son requeridos' });
    }
    // Verificar si el producto ya existe (case-insensitive)
    const exists = await Product.findOne({ NomProducto: { $regex: `^${NomProducto}$`, $options: 'i' } });
    if (exists) {
      return res.status(400).json({ message: 'El producto ya existe' });
    }
    const newProduct = await Product.create({ NomProducto, Categoria });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor',
      error: error.message
    });
  }
};

const getProductos = async (req, res) => {
  try {
    const productos = await Product.find({});
    res.json(productos);
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor',
      error: error.message
    });
  }
};

const editProducto = async (req, res) => {
  try {
    const productoId = req.params.id;
    const { NomProducto, Categoria } = req.body;
    if (!NomProducto || !Categoria) {
      return res.status(400).json({ message: 'NomProducto y Categoria son requeridos' });
    }
    const updated = await Product.findByIdAndUpdate(productoId, { NomProducto, Categoria }, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor',
      error: error.message
    });
  }
};

const deleteProducto = async (req, res) => {
  try {
    const productoId = req.params.id;
    const deleted = await Product.findByIdAndDelete(productoId);
    if (!deleted) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor',
      error: error.message
    });
  }
};

module.exports = {
  createCategoria,
  getCategorias,
  editCategoria,
  deleteCategoria,
  createProducto,
  getProductos,
  editProducto,
  deleteProducto
};
