const camelize = require('camelize');
const connection = require('./connection');
const { getFormattedColumnNames, getFormattedPlaceholders } = require('../utils/queryformatter');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products ORDER BY id ASC'); // Sem o [] em products, vem o ressult assim: [[], []] 
  return camelize(products);
};

const findById = async (id) => {
  const [[product]] = await connection.execute(`SELECT * FROM products WHERE id = ${id}`);
  return camelize(product);
};

const insertProduct = async (product) => {
  const columns = getFormattedColumnNames(product);
  const placeholders = getFormattedPlaceholders(product);
  const query = `INSERT INTO products (${columns}) VALUE (${placeholders})`;
  const [{ insertId }] = await connection.execute(query, [...Object.values(product)]);

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insertProduct,
};