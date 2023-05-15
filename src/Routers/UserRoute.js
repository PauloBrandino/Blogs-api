const express = require('express');
const { UserController } = require('../controllers');
const validateUserBody = require('../middleware/validateCreateUserBody');

const userRoute = express.Router();

userRoute.post('/', validateUserBody, UserController.createUser);

module.exports = userRoute;