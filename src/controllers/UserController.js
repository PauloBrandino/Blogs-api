const { UserService } = require('../services');
const { token } = require('../utils/generateToken');

const createUser = async (req, res) => {
    try {
        const userInfo = req.body;
        const verifyIfExists = await UserService.getUserByEmail(userInfo.email);
        if (verifyIfExists) {
            return res.status(409).json({ message: 'User already registered' });
        }
    
        const createdUser = await UserService.createUser(userInfo);

        const { password: _password, ...userWithoutPassword } = createdUser.dataValues;
        const generatedToken = token(userWithoutPassword);
        
        return res.status(201).json({ token: generatedToken });
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Internal Error', error: error.message });
    }
};

const getAllUsers = async (_req, res) => {
        const users = await UserService.getAllUsers();

        return res.status(200).json(users);
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    const getUser = await UserService.getUserById(id);
    if (!getUser) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(getUser);
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
};