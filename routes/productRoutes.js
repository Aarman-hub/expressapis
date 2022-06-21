const express = require('express');
const { allProducts, createProduct, productDetail, updateProduct, productCount, featuredProduct } = require('../controllers/productControllers');

const route = express.Router()


route.get('/', allProducts);
route.post('/', createProduct);
route.get('/:id', productDetail);
route.get('/:id', updateProduct);
route.get('/get/count', updateProduct);
route.get('/get/featured/:count', featuredProduct);


module.exports = route;