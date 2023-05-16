const { BlogPost, PostCategory, sequelize } = require('../models');

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

module.exports = {
    createPost,
};