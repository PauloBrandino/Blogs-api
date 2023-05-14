const jwt = require('jsonwebtoken');

const { UserService } = require('../services');

const SECRET_WORD = process.env.JWT_SECRET || 'testBlogAPI';
const JWT_CONFIG = { algorithm: 'HS256', expiresIn: '10m' };

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
        const token = jwt.sign({ data: userWithoutPassword }, SECRET_WORD, JWT_CONFIG);

        return res.status(200).json({ token });
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Internal Error', error: error.message });
    }
};

module.exports = { login };