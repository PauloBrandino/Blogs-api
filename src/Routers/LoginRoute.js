const express = require('express');
const { LoginController } = require('../controllers');
const validateBody = require('../middleware/validateLoginBody');

const loginRoute = express.Router();

loginRoute.post('/', validateBody, LoginController.login);

module.exports = loginRoute;
