const jwt = require('jsonwebtoken');
const { cookie_name, secret } = require('../config');
const { createToken } = require('../utils/jwt');

module.exports = () => (req, res, next) => {
    const token = req.cookies[cookie_name];
    try {
        const decoded = jwt.verify(token, secret);
        res.cookie(cookie_name, createToken({ id: decoded.id }), { httpOnly: true });
        req.decoded = decoded;
        next();
    } catch (error) {
        res.clearCookie(cookie_name);
        res.status(401).send({ message: 'Please log in' });
    }

};