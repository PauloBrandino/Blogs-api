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
        BlogPost.belongsToMany(Category,
        {
            foreignKey: 'postId',
            as: 'post',
            through: PostCategory,
            otherKey: 'categoryId'
        });
        Category.belongsToMany(BlogPost,
            {
                foreignKey: 'categoryId',
                as: 'categories',
                through: PostCategory,
                otherKey: 'postId'
            });
    };
    
    return PostCategory;
    };

module.exports = PostCategorySchema;