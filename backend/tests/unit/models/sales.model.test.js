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

  it('retorna "NOT FOUND" quando não há vendas', async function () {
    sinon.stub(connection, 'execute').resolves([]);
  
    const responseModel = await salesModel.findAll();
  
    expect(responseModel).to.be.deep.equal(undefined);
  });

  it('retorna "NOT FOUND" quando a venda não é encontrada', async function () {
    const nonExistentId = 999;
    sinon.stub(connection, 'execute').resolves([]);
  
    const responseModel = await salesModel.findById(nonExistentId);
  
    expect(responseModel).to.be.deep.equal(undefined);
  });

  it('salva produtos corretamente', async function () {
    const sales = [{ productId: 1, quantity: 10 }, { productId: 2, quantity: 5 }];
    const saleId = 1;
    const expectedValues = [[1, 10, 1], [2, 5, 1]];
  
    const executeStub = sinon.stub(connection, 'execute');
  
    await salesModel.saveProducts(sales, saleId);
  
    expect(executeStub.callCount).to.equal(2);
    expect(executeStub.firstCall.args[1]).to.deep.equal(expectedValues[0]);
    expect(executeStub.secondCall.args[1]).to.deep.equal(expectedValues[1]);
  });
  
  afterEach(function () { return sinon.restore(); });
});