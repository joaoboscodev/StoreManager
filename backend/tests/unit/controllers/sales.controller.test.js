const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { allSalesFromService, salesByIdFromService, salesByIdFromServiceNotFound, 
  allSalesFromServiceNotFound, newSaleFromModel, saleFromServiceCreated } = require('../mocks/sales.mock');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const statusHTTP = require('../../../src/utils/statusHTTP');

describe('A CAMADA DE CONTROLLER DE VENDAS', function () {
  it('deve listar todas as vendas', async function () {
    sinon.stub(salesService, 'findAll').resolves(allSalesFromService);

    const req = {
      params: {},
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSalesFromService.data);
  });

  it('deve listar uma venda pelo ID', async function () {
    sinon.stub(salesService, 'findById').resolves(salesByIdFromService);

    const req = {
      params: { id: 1 },
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesByIdFromService.data);
  });

  it('deve retornar um erro quando não houver vendas', async function () {
    sinon.stub(salesService, 'findAll').resolves(allSalesFromServiceNotFound);

    const req = {
      params: {},
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findAll(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(allSalesFromServiceNotFound.data);
  });

  it('deve retornar um erro quando o ID não existe', async function () {
    sinon.stub(salesService, 'findById').resolves(salesByIdFromServiceNotFound);

    const req = {
      params: { id: 99 },
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(salesByIdFromServiceNotFound.data);
  });

  it('deve registrar uma nova venda', async function () {
    sinon.stub(salesService, 'insertSales').resolves(saleFromServiceCreated);

    const req = {
      params: {},
      body: newSaleFromModel,
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.insertSales(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(saleFromServiceCreated.data);
  });

  it('deve retornar o status 500', function () {
    const response = statusHTTP('SERVIDOR');
    expect(response).to.be.equal(500);
  });

  afterEach(function () { return sinon.restore(); });
});
