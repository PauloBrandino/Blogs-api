const { Category } = require('../models');

const createCategory = (name) => Category.create({ name });

const allCategories = () => Category.findAll();

module.exports = {
    createCategory,
    allCategories,
};