const jwt = require('jsonwebtoken');

const { secret } = require('../config');

function createToken(data){
    const token = jwt.sign(data, secret, { expiresIn: '1d' });
    return token;
}

module.exports = {
    createToken
};