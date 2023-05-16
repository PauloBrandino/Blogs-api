const express = require('express');
const { PostController } = require('../controllers');
const { validateToken } = require('../middleware/validateToken');
const validateBodyPost = require('../middleware/validateCreatePostBody');

const postRoute = express.Router();

postRoute.post('/', validateToken, validateBodyPost, PostController.createPost);

module.exports = postRoute;