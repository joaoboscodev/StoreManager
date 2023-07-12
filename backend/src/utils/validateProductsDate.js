const { addNewProduct } = require('./schemas');

const validateProduct = (newProduct) => {
  const { error } = addNewProduct.validate(newProduct);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

module.exports = {
  validateProduct,
};