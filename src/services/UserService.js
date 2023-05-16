const { User } = require('../models');

const getUserByEmail = (email) => User.findOne({ where: { email } }); 

const createUser = ({ displayName, email, password, image }) => User
    .create({ displayName, email, password, image });

const getAllUsers = () => User.findAll({
    attributes: { exclude: 'password' },
});

const getUserById = (id) => User.findByPk(id, {
    attributes: { exclude: 'password' },
});

const deleteUser = (id) => User.destroy(
    {
        where: { id },
    },
);

module.exports = {
    getUserByEmail,
    createUser,
    getAllUsers,
    getUserById,
    deleteUser,
};