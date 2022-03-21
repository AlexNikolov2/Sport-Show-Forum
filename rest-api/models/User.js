const {model, Schema, Types: {ObjectId} } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    avatar: {
        type: String,
    },
    posts: [{
        type: ObjectId,
        ref: 'Post'
    }]
});

const User = model('User', userSchema);

module.exports = User;

