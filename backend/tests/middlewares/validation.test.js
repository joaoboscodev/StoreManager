const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validateCreateProduct = require('../../src/middlewares/newProductValidate');
const { newSaleFromModel } = require('../unit/mocks/sales.mock');
const validateCreateSale = require('../../src/middlewares/newSaleValidate');

chai.use(sinonChai);

describe('Os MIDDLEWARES', function () {
  describe('O middleware validateNewProduct', function () {
    it('deve registrar um novo produto', async function () {
      const next = sinon.stub().returns();

      const req = {
        params: {},
        body: { name: 'Monitor' },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await validateCreateProduct(req, res, next);

      expect(next).to.have.been.calledWith();
    });

    it('deve retornar um erro quando os campos não estão preenchidos', async function () {
      const next = sinon.stub().returns();

      const req = {
        params: {},
        body: {},
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await validateCreateProduct(req, res, next);

      expect(res.status).to.have.been.calledWith(400);
    });
  });

  describe('O middleware validateNewSale', function () {
    it('deve registrar uma nova venda', async function () {
      const next = sinon.stub().returns();

      const req = {
        params: {},
        body: { ...newSaleFromModel },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await validateCreateSale(req, res, next);
      expect(next).to.have.been.calledWith();
    });
  });

  afterEach(function () { return sinon.restore(); });
});
