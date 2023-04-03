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

module.exports = {
  findAll,
  getById,
  insert,
};