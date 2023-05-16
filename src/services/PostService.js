const { BlogPost, User, Category, PostCategory, sequelize } = require('../models');

const createBlogCategory = (newPost, categoryIds) => categoryIds.forEach(async (categoryId) => {
    await PostCategory.create({
        postId: newPost.dataValues.id,
        categoryId,
    });
});

const createPost = async ({ title, content, categoryIds, userId }) => {
        const result = await sequelize.transaction(async (t) => {
            const newPost = await BlogPost.create(
            {
                title,
                content,
                categoryIds,
                published: new Date(),
                updated: new Date(),
                userId,
            },
            {
                transaction: t,
            },
        );
            createBlogCategory(newPost, categoryIds);
            return newPost;
        });
        return result;
};

const getAllPosts = async () => BlogPost.findAll({
    include: [
        { model: User, as: 'user', attributes: { exclude: 'password' } },
        { model: Category, as: 'categories', through: { attributes: [] } },
    ],
});

const getById = (id) => BlogPost.findByPk(id, {
    include: [
        { model: User, as: 'user', attributes: { exclude: 'password' } },
        { model: Category, as: 'categories', through: { attributes: [] } },
    ],
});

const updatePost = async ({ title, content }, id, userIdBody) => {
    const { userId } = await getById(id);
    if (userId !== userIdBody) return undefined;

     const updated = await BlogPost.update(
{
        title,
        content,
        updated: new Date(),
    },
    {
        where: { id },
    },
);
    return updated;
};

module.exports = {
    createPost,
    getAllPosts,
    getById,
    updatePost,
};