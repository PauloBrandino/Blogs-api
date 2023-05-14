const { DataTypes } = require("sequelize");

const UserSchema = (sequelize, DataTypes) => {
    const UserTable = sequelize.define('User', {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
        displayName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.INTEGER,
        image: DataTypes.STRING
    },
    {
        tableName: 'users',
        underscored: true,
        timestamps: false,
    });
    return UserTable;
};

module.exports = UserSchema;