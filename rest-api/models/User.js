const {model, Schema, Types: {ObjectId} } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }, 
    avatar: {
        type: String,
        required: [true, 'Avatar is required']
    },
    description: {
        type: String
    },
    posts: [{
        type: ObjectId,
        ref: 'Post'
    }]
});

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;

