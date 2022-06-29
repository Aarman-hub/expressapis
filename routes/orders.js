const express = require('express');
const { createOrder, getOrders, updateOrder, deleteOrder } = require('../controllers/orderControllers');
const route = express.Router();




route.get('/', getOrders);
route.get('/:id', getOrders);
route.post('/', createOrder);
route.get('/:id', updateOrder);
route.get('/:id', deleteOrder);


module.exports = route;