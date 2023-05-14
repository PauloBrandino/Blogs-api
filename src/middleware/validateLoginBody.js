const validateBody = (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: 'Some required fields are missing' });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Error' });
    }
};

module.exports = validateBody;