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

module.exports = {
    createPost,
    getAllPosts,
};