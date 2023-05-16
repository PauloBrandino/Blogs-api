const { DataTypes } = require("sequelize");

const PostCategorySchema = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        categoryId: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.INTEGER,
        }
      },
      {
        timestamps: false,
        underscored: true,
        tableName: 'posts_categories',
      },
    );
    PostCategory.associate = ({ BlogPost, Category }) => {
      Category.belongsToMany(BlogPost,
        {
          foreignKey: 'categoryId',
          as: 'blogPosts',
          through: PostCategory,
          otherKey: 'postId'
        });
        BlogPost.belongsToMany(Category,
        {
            foreignKey: 'postId',
            as: 'categories',
            through: PostCategory,
            otherKey: 'categoryId'
        });
      };
    return PostCategory;
    };

module.exports = PostCategorySchema;