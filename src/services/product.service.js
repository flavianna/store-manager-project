const { productModel } = require('../models');
const { validateId, validateInsertProduct } = require('./validations/validationInput');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const getById = async (id) => {
  const error = validateId(id);
  if (error.type) return error;

  const product = await productModel.getById(id);
  if (product) return { type: null, message: product };

  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const insert = async (name) => {
  const error = validateInsertProduct(name);
  if (error.type) return error;

  const newIdProduct = await productModel.insert({ name });
  const product = await productModel.getById(newIdProduct);

  return { type: null, message: product };
};

const update = async (id, name) => {
  const error = validateInsertProduct(name);
  if (error.type) return error;

  const verifyProduct = await productModel.getById(id);
  if (!verifyProduct) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productModel.update(id, name);
  return {
    type: null, message: { id, name },
  };
};

const erase = async (id) => {
  const allProducts = await productModel.findAll();
  const validate = allProducts.some((product) => +product.id === +id);
  if (!validate) return { type: 404, message: 'Product not found' };

  const { verify } = await productModel.erase(id);
  if (verify === 0) return { type: 404, message: 'Product not found' };

  return {
    type: null, message: verify,
  };
};

module.exports = {
  findAll,
  getById,
  insert,
  update,
  erase,
};
