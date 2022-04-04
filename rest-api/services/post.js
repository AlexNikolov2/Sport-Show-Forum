const Post = require('../models/Post');
const Comment = require('../models/Comment');

async function create(post){
    const newPost = new Post(post);
    return await newPost.save();
}

async function getAll(){
    return await Post.find({}).lean();
}

async function getById(id){
    return await Post.findById(id).populate('owner', 'username').lean();
}

async function updatePost(id, post){
    return await Post.findByIdAndUpdate(id, post, {runValidators: true});
}

async function deletePost(id){
    return await Post.findByIdAndDelete(id);
}

async function like(id, userId){
    const post = await Post.findById(id);
    post.likes.push(userId);
    post.likes.length++;
    return await post.save();
}

async function likeComment(id, userId, postId){
    const post = await Post.findById(postId);
    const comment = post.comments.id(id);
    comment.likes.push(userId);
    comment.likes.length++;
    return await post.save();
}

async function createComment(body){
    return Comment.create({body});
}

async function getCommentsByPostId(postId){
    return Comment.find({post: postId}).populate('owner', 'username').lean();
}

module.exports = {
    create,
    getAll,
    getById,
    updatePost,
    deletePost,
    like,
    likeComment,
    createComment,
    getCommentsByPostId,
};