const { productsModel } = require('../models');
const { validateProduct } = require('../utils/validateProductsDate');

const findAll = async () => {
  const products = await productsModel.findAll();
  if (!products) {
    return { status: 'NOT FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFUL', data: products };
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);
  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFUL', data: product };
};

const insertProduct = async (product) => {
  const error = validateProduct(product);
  if (error) return { status: error.status, data: { message: error.message } };
  const insertId = await productsModel.insertProduct(product);
  const newProduct = await productsModel.findById(insertId);

  return { status: 'CREATED', data: newProduct };
};

const updateProduct = async (productId, product) => {
  const productExists = await productsModel.findById(productId);
  if (!productExists) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  const error = validateProduct(product);
  if (error) return { status: error.status, data: { message: error.message } };

  await productsModel.updateProduct(productId, product);
  const updatedProduct = await productsModel.findById(productId);

  return { status: 'SUCCESSFUL', data: updatedProduct };
};

module.exports = { findAll, findById, insertProduct, updateProduct };