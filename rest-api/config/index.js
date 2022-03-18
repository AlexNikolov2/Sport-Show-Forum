const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        db_connection: 'mongodb://localhost/sportshow',
        cookie_name: 'user',
        secret: 'Djamaikata shampiona',
        salt_rounds: 10
    },
    production: {}
};

module.exports = config[env];