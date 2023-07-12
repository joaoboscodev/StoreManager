const { salesModel } = require('../models');

const findAll = async () => {
  const sales = await salesModel.findAll();
  if (!sales) {
    return { status: 'NOT FOUND', data: { message: 'There are no sales' } };
  }
  return { status: 'SUCCESSFUL', data: sales };
};

const findById = async (saleId) => {
  const sale = await salesModel.findById(saleId);
  if (!sale || sale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCCESSFUL', data: sale };
};

const insertSales = async (sales) => {
  const id = await salesModel.insertSale(sales);
  const formattedSales = {
    id,
    itemsSold: sales,
  };
  return { status: 'CREATED', data: formattedSales };
};

module.exports = { findAll, findById, insertSales };