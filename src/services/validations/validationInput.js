const { idSchema, nameSchema } = require('./schemas');

const validateId = async (id) => {
  const { error } = idSchema.validate(id);
  if (error) {
    return { type: 'INPUT_VALUE', message: '"id" must be a number' };
  }
  return { type: null, message: '' };
};

const validateInsertProduct = (name) => {
  const { error } = nameSchema.validate({ name });

  if (error) {
    return { type: 'INVALID_VALUE', message: '"name" is required' };
  }
  if (name.length < 5) {
    return { type: 'NOME_NOT_FOUND', message: '"name" length must be at least 5 characters long' };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateInsertProduct,
};