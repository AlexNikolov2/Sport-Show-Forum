const jwt = require('jsonwebtoken');

const { secret } = require('../config');

const createToken = (data) => {
    const token = jwt.sign(data, secret, { expiresIn: '30m' });
    return token;
};

module.exports = {
    createToken
};