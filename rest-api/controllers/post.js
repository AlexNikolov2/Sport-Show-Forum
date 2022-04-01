const router = require('express').Router();
const api = require('../services/post');
const {isUser, isCreator} = require('../middlewares/guards');
//mapper
//preload

router.get('/', async(req, res) => {
    const posts = await api.getAll();
    res.json(posts);
});