const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        db_connection: 'mongodb://localhost:27017/sportshow',
        cookie_name: 'X-Authorization',
        secret: 'Djamaikata shampiona',
        salt_rounds: 10,
        CORS: {
            origin: ['http://localhost:4200'],
            credentials: true
        },
        cloudinary: { 
            cloud_name: 'dowpa8evu', 
            api_key: '172398447894245', 
            api_secret: 'eQ9BWSDx4UTcmMu8kp5jOfZT3l8' 
          },
    },
    production: {}
};

module.exports = config[env];