const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productModel = require('../../../src/models/product.model');
const connection = require('../../../src/models/connection');
const mock = require('./mocks/product.model.mock');

describe('Product Model Unit Tests', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('findAll', function () {
    it('should return all products', async function () {
      sinon.stub(connection, 'execute').resolves([mock]);
      const result = await productModel.findAll();
      expect(result).to.deep.equal(mock);
    });
  });

  describe('getById', function () {
    it('should return a product by ID', async function () {
      const productId = 1;
      sinon.stub(connection, 'execute').resolves([[mock[0]]]);
      const result = await productModel.getById(productId);
      expect(result).to.deep.equal(mock[0]);
    });
  });

  describe('insert', function () {
    it('should insert a product and return the new ID', async function () {
      const newProduct = { name: 'Test Product' };
      const insertId = 1;
      sinon.stub(connection, 'execute').resolves([{ insertId }]);
      const result = await productModel.insert(newProduct);
      expect(result).to.equal(insertId);
    });
  });

  describe('update', function () {
    it('should update a product by ID', async function () {
      const productId = 1;
      const updatedProduct = { name: 'Updated Test Product' };
      const productResult = { affectedRows: 1 };
      sinon.stub(connection, 'execute').resolves([productResult]);
      const result = await productModel.update(productId, updatedProduct);
      expect(result[0]).to.deep.equal({ affectedRows: 1 });
    });
  });

  describe('erase', function () {
    it('should delete a product by ID', async function () {
      const productId = 1;
      const deleteResult = { affectedRows: 1 };
      sinon.stub(connection, 'execute').resolves([deleteResult]);
      const result = await productModel.erase(productId);
      expect(result).to.deep.equal(deleteResult);
    });
  });
});
