const { expect } = require('chai');
const sinon = require('sinon');

const productService = require('../../../src/services/product.service');
const productModel = require('../../../src/models/product.model');

describe('Product Service Unit Tests', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('getById', function () {
    const ID = 1;

    it('should return an error message for invalid ID', async function () {
      sinon.stub(productModel, 'getById').resolves(undefined);
      const response = await productService.getById(ID);
      expect(response.message).to.be.equal('Product not found');
    });

    it('should return the correct product for a valid ID', async function () {
      const product = { id: ID, name: 'Product 1' };
      sinon.stub(productModel, 'getById').resolves(product);
      const response = await productService.getById(ID);
      expect(response.message).to.deep.equal(product);
    });
  });

  describe('insert', function () {
    it('should create a new product', async function () {
      const name = 'New Product';
      const newId = 123;
      const product = { id: newId, name };
      sinon.stub(productModel, 'insert').resolves(newId);
      sinon.stub(productModel, 'getById').resolves(product);
      const response = await productService.insert(name);
      expect(response.message).to.deep.equal(product);
    });

    it('should return an error message for invalid input', async function () {
      const name = '';
      const response = await productService.insert(name);
      expect(response.type).to.be.equal('INVALID_VALUE');
    });
  });

  describe('update', function () {
    const ID = 1;

    it('should update the name of an existing product', async function () {
      const name = 'New Name';
      const product = { id: ID, name };
      sinon.stub(productModel, 'getById').resolves(product);
      sinon.stub(productModel, 'update').resolves();
      const response = await productService.update(ID, name);
      expect(response.message).to.deep.equal(product);
    });

    it('should return an error message for invalid input', async function () {
      const name = '';
      const response = await productService.update(ID, name);
      expect(response.type).to.be.equal('INVALID_VALUE');
    });

    it('should return an error message for non-existing product', async function () {
      sinon.stub(productModel, 'getById').resolves(undefined);
      const response = await productService.update(ID, 'New Name');
      expect(response.type).to.be.equal('PRODUCT_NOT_FOUND');
    });
  });

  describe('erase', function () {
    const ID = 1;

    it('should remove an existing product', async function () {
      sinon.stub(productModel, 'findAll').resolves([{ id: ID, name: 'Product 1' }]);
      sinon.stub(productModel, 'erase').resolves({ verify: 1 });
      const response = await productService.erase(ID);
      expect(response.message).to.be.equal(1);
    });

    it('should return an error message for non-existing product', async function () {
      sinon.stub(productModel, 'findAll').resolves([]);
      const response = await productService.erase(ID);
      expect(response.type).to.be.equal(404);
    });
  });
});
