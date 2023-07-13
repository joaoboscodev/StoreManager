const route = require('express').Router();
const { salesController } = require('../controllers');
const newSaleValidate = require('../middlewares/newSaleValidate');

route.get('/', salesController.findAll);
route.get('/:id', salesController.findById);

route.post('/', newSaleValidate, salesController.insertSales);

module.exports = route;