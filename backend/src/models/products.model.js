const camelize = require('camelize');
const connection = require('./connection');
const { getFormattedColumnNames, getFormattedPlaceholders, 
  getFormattedUpdateColumns } = require('../utils/queryformatter');

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

const updateProduct = async (productId, product) => {
  const columns = getFormattedUpdateColumns(product);
  const query = `UPDATE products SET ${columns} WHERE id = ?;`;
  return connection.execute(query, [...Object.values(product), productId]);
};

module.exports = {
  findAll,
  findById,
  insertProduct,
  updateProduct,
};