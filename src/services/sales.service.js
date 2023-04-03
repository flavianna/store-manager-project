const { salesModel } = require('../models');
const schema = require('./validations/validationInput');

const findAllDeals = async () => {
  const deals = await salesModel.findAllDeals();
  return { type: null, message: deals };
};

const getDealById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;

  const deal = await salesModel.getDealById(id);
  if (!deal[0]) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: deal };
};

module.exports = {
  findAllDeals,
  getDealById,
};