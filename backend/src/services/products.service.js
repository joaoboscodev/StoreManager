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

module.exports = { findAll, findById, insertProduct };