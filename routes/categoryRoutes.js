const express = require('express');
const { allCategories, createCategory, deleteCategory, updateCategory } = require('../controllers/categoryControllers');

const route = express.Router()


route.get('/', allCategories);
route.post('/', createCategory);
route.delete('/:id', deleteCategory);
route.put('/:id', updateCategory);


module.exports = route;