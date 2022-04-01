const router = require('express').Router();
const api = require('../services/post');
const {isUser, isCreator} = require('../middlewares/guards');
//mapper
//preload

router.get('/', async(req, res) => {
    const posts = await api.getAll();
    res.json(posts);
});

router.get('/:postId', async(req, res) => {
    const post = await api.getById(req.params.id);
    res.json(post);
});

router.get('/:postId/comments', async(req, res) => {
    const comments = await api.getComments(req.params.id);
    res.json(comments);
});



