const { User } = require('../models');

const getUserByEmail = (email) => User.findOne({ where: { email } }); 

const createUser = ({ displayName, email, password, image }) => User
    .create({ displayName, email, password, image });

const getAllUsers = () => User.findAll({
    attributes: { exclude: 'password' },
});

module.exports = {
    getUserByEmail,
    createUser,
    getAllUsers
};