var jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    let token = req.headers.authorization;
    // token = token.replace('Bearer ', '')

    if (!token) {
        res.status(401).json({ message: 'Token is missing' });
        return;
    }

    try {
        getToken = token.split(' ')[1];
        const decoded = jwt.verify(getToken, 'tes1234');
        console.log(decoded, 'masullll')
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authMiddleware;