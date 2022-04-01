const {model, Schema, Types: {ObjectId} } = require('mongoose');

const commentSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    owner: {
        type: ObjectId,
        ref: 'User'
    },
    post: {
        type: ObjectId,
        ref: 'Post'
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
}, {timestamps: {createdAt: 'created_at'}});

const Comment = model('Comment', commentSchema);

module.exports = Comment;