const route = require('express').Router();
const { productsController } = require('../controllers');
const newProductValidate = require('../middlewares/newProductValidate');

route.get('/', productsController.findAll);
route.get('/:id', productsController.findById);

route.post('/', newProductValidate, productsController.insertProduct);

module.exports = route;