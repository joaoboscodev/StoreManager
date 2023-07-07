const { productsService } = require('../services');
const statusHTTP = require('../utils/statusHTTP');

const findAll = async (_req, res) => {
  const { status, data } = await productsService.findAll();
  return res.status(statusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.findById(id);
  return res.status(statusHTTP(status)).json(data);
};

module.exports = {
  findAll, findById,
};