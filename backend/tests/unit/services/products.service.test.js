const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { allProductsService, productByIdService, allProducts, productById } = require('../mocks/products.mock');
const { productsService } = require('../../../src/services');

describe('Testes para Products Service', function () {
  it('listar todos os produtos', async function () {
    sinon.stub(productsModel, 'findAll').resolves(allProducts);

    const responseService = await productsService.findAll();

    expect(responseService).to.be.deep.equal(allProductsService);
  });

  it('retornar erro caso nao tenha produtos', async function () {
    sinon.stub(productsModel, 'findAll').resolves(undefined);

    const responseService = await productsService.findAll();

    expect(responseService.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('listar produto por id', async function () {
    sinon.stub(productsModel, 'findById').resolves(productById);

    const inputId = 1;
    const responseService = await productsService.findById(inputId);

    expect(responseService).to.be.deep.equal(productByIdService);
  });

  it('retornar erro caso nao tenha produto com esse id', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);

    const responseService = await productsService.findById();

    expect(responseService.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('should return a error when there are no products', async function () {
    sinon.stub(productsModel, 'findAll').resolves(undefined);

    const responseService = await productsService.findAll();
    expect(responseService).to.be.an('object');
  });
  afterEach(function () { return sinon.restore(); });
});