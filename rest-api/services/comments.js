const Comment = require('../models/Comment');

async function createComment(body){
    return Comment.create({body});
}

async function getCommentsByPostId(postId){
    return Comment.find({post: postId}).populate('owner', 'username').lean();
}

//async function getCommentsCount(postId){
//    return Comment.countDocuments({post: postId});
//}

module.exports = {
    createComment,
    getCommentsByPostId,
    getCommentsCount
};