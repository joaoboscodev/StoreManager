const { productsModel } = require('../models');

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
  const insertId = await productsModel.insertProduct(product);
  const newProduct = await productsModel.findById(insertId);

  return { status: 'CREATED', data: newProduct };
};

module.exports = { findAll, findById, insertProduct };