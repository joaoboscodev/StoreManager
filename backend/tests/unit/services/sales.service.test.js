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
  afterEach(function () { return sinon.restore(); });
});