const connection = require('./connection');

const findAllDeals = async () => {
  const [result] = await connection.execute(
    `SELECT sales.id AS saleId, sales.date, 
    sales_products.product_id AS productId, 
    sales_products.quantity 
    FROM StoreManager.sales 
    JOIN StoreManager.sales_products ON sales.id = sales_products.sale_id`,
  );
  return result;
};

const getDealById = async (id) => {
  const [result] = await connection.execute(
    `SELECT sp.product_id AS productId, s.date, sp.quantity 
     FROM StoreManager.sales AS s
     JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id
     WHERE s.id = ?`,
    [id],
  );
  return result;
};

module.exports = {
  findAllDeals,
  getDealById,
};