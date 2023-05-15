const { User } = require('../models');

const getUserByEmail = (email) => User.findOne({ where: { email } }); 

const createUser = ({ displayName, email, password, image }) => User
    .create({ displayName, email, password, image });

module.exports = {
    getUserByEmail,
    createUser,
};