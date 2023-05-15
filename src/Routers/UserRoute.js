const express = require('express');
const { UserController } = require('../controllers');
const validateUserBody = require('../middleware/validateCreateUserBody');
const { validateToken } = require('../middleware/validateToken');

const userRoute = express.Router();

userRoute.post('/', validateUserBody, UserController.createUser);
userRoute.get('/', validateToken, UserController.getAllUsers);
userRoute.get('/:id', validateToken, UserController.getUserById);

module.exports = userRoute;