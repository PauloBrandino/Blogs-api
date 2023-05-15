const jwt = require('jsonwebtoken');

const SECRET_WORD = process.env.JWT_SECRET || 'testBlogAPI';
const JWT_CONFIG = { algorithm: 'HS256', expiresIn: '10m' };

const token = (bodyReq) => jwt.sign(bodyReq, SECRET_WORD, JWT_CONFIG);

const validateTokenFunc = (tokenID) => jwt.verify(tokenID, SECRET_WORD);

module.exports = {
    token,
    validateTokenFunc,
};