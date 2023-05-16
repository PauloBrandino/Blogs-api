const { DataTypes } = require("sequelize");

const BlogPostSchema = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        published: DataTypes.DATE,
        updated: DataTypes.DATE,
        userId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
      },
      {
        timestamps: false,
        underscored: true,
        tableName: 'blog_posts',
      },
    );
    BlogPost.associate = ({ User }) => {
      BlogPost.belongsTo(User,
        { foreignKey: 'userId', as: 'user' });
    };
    
    return BlogPost;
    };

module.exports = BlogPostSchema;