const { salesService } = require('../services');
const statusHTTP = require('../utils/statusHTTP');

const findAll = async (_req, res) => {
  const { status, data } = await salesService.findAll();
  return res.status(statusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.findById(id);
  return res.status(statusHTTP(status)).json(data);
};

const insertSales = async (req, res) => {
  const sales = req.body;
  const { status, data } = await salesService.insertSales(sales);
  return res.status(statusHTTP(status)).json(data);
};

module.exports = {
  findAll, findById, insertSales,
};