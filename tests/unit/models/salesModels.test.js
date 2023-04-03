const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const sales = require('./mocks/sales.model.mock');

describe('Sales Model Unit Test', () => {
  it('Retrieves the sales list', async () => {
    sinon.stub(connection, 'execute').resolves([sales]);
    const result = await salesModel.findAllDeals();
    expect(result).to.be.deep.equal(sales);
  });

  afterEach(function () {
    sinon.restore();
  });
});