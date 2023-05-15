const { UserService } = require('../services');
const token = require('../utils/generateToken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserService.getUserByEmail(email);
        
        if (!user || user.password !== password) {
            return res
                .status(400)
                .json({ message: 'Invalid fields' });
        } 
        const { password: _password, ...userWithoutPassword } = user.dataValues;
        const generatedToken = token(userWithoutPassword);

        return res.status(200).json({ token: generatedToken });
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Internal Error', error: error.message });
    }
};

module.exports = { login };