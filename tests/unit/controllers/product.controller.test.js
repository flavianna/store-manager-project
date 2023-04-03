const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;

chai.use(sinonChai);
const productController = require('../../../src/controllers/product.controller');
const productService = require('../../../src/services/product.service');
const mock = require('./mocks/product.controller.mock');

describe('Product Controller layer tests', function () {
  it('should return the product list and status 200', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'findAll').resolves(mock);

    await productController.findAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock.message);
  });

  it('should be able to retrieve a product by its ID', async function () {
    const req = {
      params: {
        id: 1,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const foundProduct = {
      type: null,
      message: mock,
    };

    sinon.stub(productService, 'getById').resolves(foundProduct);

    await productController.getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(foundProduct.message);

    productService.getById.restore();
  });

  it('should insert a new product and return status 201 and the product data', async function () {
    const req = {
      body: {
        name: 'New product',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const insertedProduct = {
      type: null,
      message: {
        id: 1,
        name: 'New product',
      },
    };

    sinon.stub(productService, 'insert').resolves(insertedProduct);

    await productController.insert(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(insertedProduct.message);

    productService.insert.restore();
  });

  it('should return status 400 and an error message when trying to insert an invalid product', async function () {
    const req = {
      body: {
        name: '',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const invalidProductError = {
      type: 'INVALID_VALUE',
      message: 'Product name is required',
    };

    sinon.stub(productService, 'insert').resolves(invalidProductError);

    await productController.insert(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: invalidProductError.message });

    productService.insert.restore();
  });

  it('should update an existing product and return status 200 and the updated product data', async function () {
    const req = {
      params: {
        id: 1,
      },
      body: {
        name: 'Updated product',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const updatedProduct = {
      type: null,
      message: {
        id: 1,
        name: 'Updated product',
      },
    };

    sinon.stub(productService, 'update').resolves(updatedProduct);

    await productController.update(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updatedProduct.message);

    productService.update.restore();
  });

  it('should return status 400 and an error message when trying to update a product with invalid data', async function () {
    const req = {
      params: {
        id: 1,
      },
      body: {
        name: '',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const invalidProductError = {
      type: 'INVALID_VALUE',
      message: 'Product name is required',
    };

    sinon.stub(productService, 'update').resolves(invalidProductError);

    await productController.update(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: invalidProductError.message });

    productService.update.restore();
  });
});