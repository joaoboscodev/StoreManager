const camelize = require('camelize');
const connection = require('./connection');
const { getFormattedColumnNames,
getFormattedPlaceholders } = require('../utils/queryformatter');

const findAll = async () => {
  const [sales] = await connection.execute(
    `SELECT s.date, sp.* FROM sales_products AS sp INNER JOIN sales AS s
    ON sp.sale_id = s.id ORDER BY sp.sale_id, sp.product_id;
    `,
  ); // Sem o [] em products, vem o ressult assim: [[], []] 
  return camelize(sales);
};

const findById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity FROM sales AS s 
    INNER JOIN sales_products AS sp ON s.id = sp.sale_id
    WHERE s.id = ${id}
    ORDER BY sp.sale_id, sp.product_id;`,
  );
  return camelize(sale);
};

const saveProducts = async (sales, saleId) => {
  const insertPromises = sales
    .map((product) => {
      const columns = getFormattedColumnNames(product);
      const placeholders = getFormattedPlaceholders(product);
      const query = `INSERT INTO sales_products (${columns}, sale_id) VALUES (${placeholders}, ?)`;
      return connection.execute(query, [...Object.values(product), saleId]);
    });
  await Promise.all(insertPromises);
};

const insertSale = async (sales) => {
  const query = 'INSERT INTO sales () VALUES ()';
  const [{ insertId }] = await connection.execute(query, []);
  await saveProducts(sales, insertId);

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insertSale,
  saveProducts,
};