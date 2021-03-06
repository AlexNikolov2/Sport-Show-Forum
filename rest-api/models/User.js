const {model, Schema, Types: {ObjectId} } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    avatar: {
        type: String,
        required: [true, 'Avatar is required']
    },
    description: {
        type: String,
        //required: [true, 'Description is required']
    },
    posts: [{
        type: ObjectId,
        ref: 'Post'
    }],
    likes: [{
        type: ObjectId,
        ref: 'Post'
    }],
    comments: [{
        type: ObjectId,
        ref: 'Comment'
    }],
}
);
userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;

