const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};
const getById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id=?',
    [productId],
  );
  return (product);
};

const insert = async (product) => {
  const columns = Object.keys(product).join(', ');

  const placeholders = Object.keys(product)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUES (${placeholders})`,
    [...Object.values(product)],
  );
  return insertId;
};

module.exports = {
  findAll,
  getById,
  insert,
};
