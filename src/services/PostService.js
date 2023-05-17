const { Op } = require('sequelize');
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

const getAllPosts = () =>   
         BlogPost.findAll({
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

const deletePost = async (id, userIdBody) => {
    const post = await getById(id);
    console.log(post);

    if (!post) return { type: 404, message: 'Post does not exist' };
    if (post.userId !== userIdBody) return { type: 401, message: 'Unauthorized user' };
    await BlogPost.destroy(
        {
            where: { id },
        },
    );
    return { type: 204, message: 'Deleted' };
};

const queryParams = async (q) => {
    const getAll = await BlogPost.findAll(
        {
        where: {
        [Op.or]: [
            { title: { [Op.like]: `%${q}%` } },
            { content: { [Op.like]: `%${q}%` } },
        ],
    },
    include: [
        { model: User, as: 'user', attributes: { exclude: 'password' } },
        { model: Category, as: 'categories', through: { attributes: [] } },
    ],
},
);

    return getAll;
};

module.exports = {
    createPost,
    getAllPosts,
    getById,
    updatePost,
    deletePost,
    queryParams,
};