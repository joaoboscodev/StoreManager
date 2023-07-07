const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products ORDER BY id ASC'); // Sem o [] em products, vem o ressult assim: [[], []] 
  return camelize(products);
};

const findById = async (id) => {
  const [[product]] = await connection.execute(`SELECT * FROM products WHERE id = ${id}`);
  return camelize(product);
};

module.exports = {
  findAll,
  findById,
};