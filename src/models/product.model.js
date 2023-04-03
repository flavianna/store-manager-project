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

const update = async (id, product) => {
  const productResult = await connection.execute(
    'UPDATE StoreManager.products SET name= ? WHERE id= ?',
    [product, id],
  );
  return productResult;
};

const erase = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?', [id],
  );
  return result;
};

module.exports = {
  findAll,
  getById,
  insert,
  update,
  erase,
};