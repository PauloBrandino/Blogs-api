const express = require('express');
const { CategoryController } = require('../controllers');
const { validateToken } = require('../middleware/validateToken');

const categoryRoute = express.Router();

categoryRoute.post('/', validateToken, CategoryController.createCategory);

module.exports = categoryRoute;