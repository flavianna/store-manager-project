const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { sales } = require('./mocks/sales.controller.mock');

describe('Test the Sales Controller unit', () => {
  it('Returns status 200 and sales list', async () => {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'findAllDeals')
      .resolves({ type: null, message: sales });

    await salesController.allDeals(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(sales);
  });

  afterEach(() => {
    sinon.restore();
  });
});
