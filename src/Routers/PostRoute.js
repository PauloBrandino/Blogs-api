const express = require('express');
const { PostController } = require('../controllers');
const { validateToken } = require('../middleware/validateToken');
const validateBodyPost = require('../middleware/validateCreatePostBody');
const validateUpdateBody = require('../middleware/validateUpdatePostBody');

const postRoute = express.Router();

postRoute.post('/', validateToken, validateBodyPost, PostController.createPost);
postRoute.get('/', validateToken, PostController.getAllPosts);
postRoute.get('/:id', validateToken, PostController.getById);
postRoute.put('/:id', validateToken, validateUpdateBody, PostController.updatePost);

module.exports = postRoute;