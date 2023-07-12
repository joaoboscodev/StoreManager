const date = '2023-07-11T00:39:33.000Z';

const allSalesFromDb = [
  {
    date: `${date}`,
    saleId: 1,
    productId: 1,
    quantity: 5,
  },
  {
    date: `${date}`,
    saleId: 1,
    productId: 2,
    quantity: 10,
  },
  {
    date: `${date}`,
    saleId: 2,
    productId: 3,
    quantity: 15,
  },
];

const salesByIdFromDb = [
  {
    date: `${date}`,
    productId: 1,
    quantity: 5,
  },
  {
    date: `${date}`,
    productId: 2,
    quantity: 10,
  },
];

const salesByIdFromServiceNotFound = {
  status: 'NOT_FOUND', data: { message: 'Sale not found' },
};

const allSalesFromServiceNotFound = {
  status: 'NOT_FOUND', data: { message: 'There are no sales' },
};

const allSalesFromService = { status: 'SUCCESSFUL', data: allSalesFromDb };

const salesByIdFromService = { status: 'SUCCESSFUL', data: salesByIdFromDb };

module.exports = {
  allSalesFromDb,
  salesByIdFromDb,
  salesByIdFromServiceNotFound,
  allSalesFromServiceNotFound,
  allSalesFromService,
  salesByIdFromService,
}; 