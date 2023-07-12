const requiredFieldsValidate = require('../utils/requiredFieldsValidate');

const validateCreateProduct = (req, res, next) => {
  const product = req.body;
  const requiredFields = ['name'];

  const error = requiredFieldsValidate(product, requiredFields);
  if (error) return res.status(400).json({ message: error });
  return next();
};

module.exports = validateCreateProduct;