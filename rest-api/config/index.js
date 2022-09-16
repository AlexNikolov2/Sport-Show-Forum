require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        PORT: process.env.PORT || 3000,
        DB_CONNECTION: process.env.DB_CONNECTION,
        COOKIE_NAME: 'X-Authorization',
        SECRET: 'very strong secret',
        SALT_ROUNDS: 10,
        CORS: {
            origin: ['http://localhost:4200'],
            credentials: true
        }
    },
    production: {
        PORT: process.env.PORT || 80,
        DB_CONNECTION: process.env.DB_CONNECTION,
        COOKIE_NAME: 'X-Authorization',
        SECRET: 'very strong secret',
        SALT_ROUNDS: 10,
        CORS: {
            origin: ["http://localhost:4200"],
            credentials: true
        }
    }
};

module.exports = config[env];