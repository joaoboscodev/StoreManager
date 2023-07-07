const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { allProducts, productById } = require('../mocks/products.mock');

describe('Testes para Products Model', function () {
  it('listar todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const responseModel = await productsModel.findAll();

    expect(responseModel).to.be.deep.equal(allProducts);
  });

  it('listas produtos por id', async function () {
    sinon.stub(connection, 'execute').resolves([[productById]]);

    const inputId = 1;
    const responseModel = await productsModel.findById(inputId);

    expect(responseModel).to.be.deep.equal(responseModel);
  });
  afterEach(function () { return sinon.restore(); });
});