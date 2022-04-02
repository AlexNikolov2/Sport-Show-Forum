const router = require('express').Router();
const api = require('../services/post');
const {isUser, isCreator} = require('../middlewares/guards');
const mapErrors = require('../utils/mapper');
const preload = require('../utils/preload');
const {uploadToCloudinary} = require('../utils/cloudinary');

router.get('/', async(req, res) => {
    const posts = await api.getAll();
    res.status(200).send(posts);
});

router.get('/:postId', async(req, res) => {
    const post = await api.getById(req.params.id);
    res.status(200).send(post);
});

router.delete('/:postId', isCreator(), async(req, res) => {
    try{
        const post = await api.deletePost(req.params.postId, req.user._id);
        res.status(201).send(post);
    }
    catch(err){
        const error = mapErrors(err);
        res.status(400).send(error);
    }
});

/*router.put('/:postId', isCreator(), async(req, res) => {
    try{
        const post = await api.update(req.params.postId, req.body);
        res.status(201).send(post);
    }
    catch(err){
        const error = mapErrors(err);
        res.status(400).send(error);
    }
});*/

router.get('/:postId/comments', async(req, res) => {
    const comments = await api.getComments(req.params.id);
    res.json(comments);
});

router.post('/:postId/comments', isUser, async(req, res) => {
    const comment = await api.createComment(req.params.id, req.body);
    res.status(201).send(comment);
});

router.post('/create', isUser(), async(req, res) => {
    try{
        const post = await api.create(req.body);
        res.status(201).send(post);
    }
    catch(err){
        const error = mapErrors(err);
        res.status(400).send(error);
    }
});

router.post('/:postId/like', isUser(), async(req, res) => {
    try{
        const post = await api.like(req.params.postId, req.user._id);
        res.status(201).send(post);
    }
    catch(err){
        const error = mapErrors(err);
        res.status(400).send(error);
    }
});





module.exports = router;




