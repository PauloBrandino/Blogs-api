const { CategoryService } = require('../services');

const createCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' });

    const createdCategory = await CategoryService.createCategory(name);

    return res.status(201).json(createdCategory);
};

const getAllCategories = async (_req, res) => {
    const getAll = await CategoryService.allCategories();

    return res.status(200).json(getAll);
};

module.exports = {
    createCategory,
    getAllCategories,
};