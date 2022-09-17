const Post = require('../models/post');

const createPost= (data) => {
    const post = new Post(data);
    return post.save();
}

const getPostById = (postId) => {
    return Post.findById(postId);
}

async function getAllPosts() {
    return Post.find({}).lean();
}

module.exports = {
    createPost,
    getPostById,
    getAllPosts
}