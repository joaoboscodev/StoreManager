const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { allProducts, productById, productIdFromDB, productIdFromModel } = require('../mocks/products.mock');

describe('Testes para Products Model', function () {
  describe('GET', function () {
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
  });

  describe('POST', function () {
    it('registrar novo produto', async function () {
      sinon.stub(connection, 'execute').resolves([productIdFromDB]);

      const inputData = { name: 'Monitor' };
      const insertIdResponse = await productsModel.insertProduct(inputData);
      expect(insertIdResponse).to.be.a('number');
      expect(insertIdResponse).to.be.equal(productIdFromModel);
    });
  });
  afterEach(function () { return sinon.restore(); });
});