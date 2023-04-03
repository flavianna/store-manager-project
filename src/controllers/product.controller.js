const { productService } = require('../services');
const errorMap = require('../utils/errorMap');

const findAll = async (_req, res) => {
  const { type, message } = await productService.findAll();
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

const insert = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productService.insert(name);

  if (type === 'INVALID_VALUE') return res.status(400).json({ message });
  if (type === 'NOME_NOT_FOUND') return res.status(422).json({ message });

  return res.status(201).json(message);
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { type, message } = await productService.update(id, name);
    switch (type) {
      case 'INVALID_VALUE':
        return res.status(400).json({ message });
      case 'NOME_NOT_FOUND':
        return res.status(422).json({ message });
      case 'PRODUCT_NOT_FOUND':
        return res.status(404).json({ message });
      default:
        return res.status(200).json(message);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  findAll,
  getById,
  insert,
  update,
};