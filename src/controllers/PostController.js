const { PostService, CategoryService } = require('../services');
const { validateTokenFunc } = require('../utils/generateToken');

const categoryExist = async (categoryIds) => {
    const allCategories = await CategoryService.allCategories();
    const verifyIdBody = categoryIds.map((category) => {
        const verifyIdDB = allCategories.some(({ id }) => id === category);
        return verifyIdDB;
    });
    
    return verifyIdBody.every((verify) => verify === true);
};

const createPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { authorization } = req.headers;
    const payload = validateTokenFunc(authorization);

    if (!await categoryExist(categoryIds)) {
 return res.status(400)
        .json({ message: 'one or more "categoryIds" not found' }); 
}

    const newPost = {
        title,
        content,
        categoryIds,
        userId: payload.id,
    };
    const createdPost = await PostService.createPost(newPost);
    
    return res.status(201).json(createdPost);
};

const getAllPosts = async (_req, res) => {
    const getAll = await PostService.getAllPosts();

    return res.status(200).json(getAll);
};

const getById = async (req, res) => {
    const { id } = req.params;

    const getPost = await PostService.getById(id);
    if (!getPost) return res.status(404).json({ message: 'Post does not exist' });
    
    return res.status(200).json(getPost);
};

const updatePost = async (req, res) => {
    const post = req.body;
    const { id } = req.params;
    const { authorization } = req.headers;
    const token = validateTokenFunc(authorization);

    const updatedPost = await PostService.updatePost(post, id, token.id);
    if (!updatedPost) return res.status(401).json({ message: 'Unauthorized user' });

    const getPostUpdated = await PostService.getById(id);

    return res.status(200).json(getPostUpdated);
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    const { authorization } = req.headers;

    const token = validateTokenFunc(authorization);
    const { type, message } = await PostService.deletePost(id, token.id);
    if (type === 404) return res.status(type).json({ message });
    if (type === 401) return res.status(type).json({ message });

    return res.status(204).json();
};

module.exports = {
    createPost,
    getAllPosts,
    getById,
    updatePost,
    deletePost,
};