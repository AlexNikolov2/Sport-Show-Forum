const Post = require('../models/post');

const createPost= (data) => {
    const post = new Post(data);
    return post.save();
}

const getPostById = (postId) => {
    return Post.findById(postId);
}

module.exports = {
    createPost,
    getPostById
}