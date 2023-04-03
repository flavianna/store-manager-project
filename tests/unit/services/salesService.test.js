const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');

const { sales } = require('./mocks/sales.service.mock');

describe('Test the Sales Service unit', () => {
  it('Returns the list of sales', async () => {
    sinon.stub(salesModel, 'findAllDeals').resolves(sales);
    const result = await salesService.findAllDeals();
    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(sales);
  });

  afterEach(function () {
    sinon.restore();
  });
});
