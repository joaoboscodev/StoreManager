const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { allSalesFromDb, salesByIdFromDb } = require('../mocks/sales.mock');
const { salesService } = require('../../../src/services');

describe('Testes para sales Service', function () {
  it('listar todos os sales', async function () {
    sinon.stub(salesModel, 'findAll').resolves(allSalesFromDb);

    const responseService = await salesService.findAll();

    expect(responseService).to.be.an('object');
  });

  it('listar sales por id', async function () {
    sinon.stub(salesModel, 'findById').resolves(salesByIdFromDb);

    const inputId = 1;
    const responseService = await salesService.findById(inputId);

    expect(responseService).to.be.an('object');
  });

  it('erro se nao tiver sales', async function () {
    sinon.stub(salesModel, 'findAll').resolves(undefined);

    const responseService = await salesService.findAll();
    expect(responseService).to.be.an('object');
    expect(responseService.data).to.be.deep.equal({ message: 'There are no sales' });
  });

  it('erro se o id nao existir', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);

    const responseService = await salesService.findById(99);

    expect(responseService).to.be.an('object');
    expect(responseService.data).to.be.deep.equal({ message: 'Sale not found' });
  });
  afterEach(function () { return sinon.restore(); });
});