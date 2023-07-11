const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { allSalesFromDb, salesByIdFromDb } = require('../mocks/sales.mock');

describe('Testes para sales Model', function () {
  it('listar todos os sales', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesFromDb]);

    const responseModel = await salesModel.findAll();

    expect(responseModel).to.be.deep.equal(allSalesFromDb);
  });

  it('listas produtos por id', async function () {
    sinon.stub(connection, 'execute').resolves([[salesByIdFromDb]]);

    const inputId = 1;
    const responseModel = await salesModel.findById(inputId);

    expect(responseModel).to.be.deep.equal(responseModel);
  });
  afterEach(function () { return sinon.restore(); });
});