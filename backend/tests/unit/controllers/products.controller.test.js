const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { allProductsService, productByIdService, allProductsServiceError, productByIdServiceError } = require('../mocks/products.mock');
const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');

describe('Testes para Products Controller', function () {
  it('listar todos os produtos', async function () {
    sinon.stub(productsService, 'findAll').resolves(allProductsService);

    const req = {
      params: {},
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsService.data);
  });

  it('erro ao listar todos os produtos', async function () {
    sinon.stub(productsService, 'findAll').resolves(allProductsServiceError);

    const req = {
      params: {},
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findAll(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(allProductsServiceError.data);
  });

  it('listar produto por id', async function () {
    sinon.stub(productsService, 'findById').resolves(productByIdService);

    const req = {
      params: { id: 1 },
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productByIdService.data);
  });

  it('should return an error when the ID does not exist', async function () {
    sinon.stub(productsService, 'findById').resolves(productByIdServiceError);

    const req = {
      params: { id: 50 },
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(productByIdServiceError.data);
  });
  afterEach(function () { return sinon.restore(); });
});