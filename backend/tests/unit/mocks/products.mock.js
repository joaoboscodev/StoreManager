const allProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const productById = {
  id: 1,
  name: 'Martelo de Thor',
};

const allProductsService = {
  status: 'SUCCESSFUL',
  data: [
    { id: 1, name: 'Martelo de Thor' },
    { id: 2, name: 'Traje de encolhimento' },
    { id: 3, name: 'Escudo do Capitão América' },
  ],
};

const productByIdService = { status: 'SUCCESSFUL', data: { id: 1, name: 'Martelo de Thor' } };

const allProductsServiceError = {
  status: 'NOT_FOUND', data: { message: 'There are no products' },
};

const productByIdServiceError = {
  status: 'NOT_FOUND', data: { message: 'Product not found' },
};

const productIdFromDB = { insertId: 4 };

const productIdFromModel = 4;

const newProductByIdFromModel = {
  id: 4,
  name: 'Monitor',
};

const productFromServiceCreated = {
  status: 'CREATED',
  data: newProductByIdFromModel,
};

module.exports = { 
  allProducts,
  productById,
  allProductsService,
  productByIdService,
  allProductsServiceError,
  productByIdServiceError,
  productIdFromDB,
  productIdFromModel,
  newProductByIdFromModel,
  productFromServiceCreated,
};