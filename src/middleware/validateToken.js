const { validateTokenFunc } = require('../utils/generateToken');

const validateToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    try {
        validateTokenFunc(authorization);   
    } catch (error) {
        return res.status(401)
            .json({ message: 'Expired or invalid token' });
    }
    next(); 
};

module.exports = {
    validateToken,
};