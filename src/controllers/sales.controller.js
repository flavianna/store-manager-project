const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const allDeals = async (_req, res) => {
  const { type, message } = await salesService.findAllDeals();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getDealById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getDealById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  allDeals,
  getDealById,
};