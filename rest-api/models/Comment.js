const {model, Schema, Types: {ObjectId} } = require('mongoose');

const commentSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    ownerId: {
        type: ObjectId,
        ref: 'User'
    },
    postId: {
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