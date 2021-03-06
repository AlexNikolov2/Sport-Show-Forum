const router = require('express').Router();
const api = require('../services/post');
const {isUser, isCreator} = require('../middlewares/guards');
const mapErrors = require('../utils/mapper');
const preload = require('../utils/preload');
const {uploadToCloudinary} = require('../utils/cloudinary');

router.get('/', async(req, res) => {
    const posts = await api.getAll();
    res.status(200).json(posts);
});

router.get('/:postId', async(req, res) => {
    const post = await api.getById(req.params.id);
    res.status(200).json(post);
});

router.delete('/:postId', isCreator, async(req, res) => {
    try{
        const post = await api.deletePost(req.params.postId, req.user._id);
        await post.save();
        res.status(201).json(post);
    }
    catch(err){
        const error = mapErrors(err);
        res.status(400).json(error);
    }
});

router.put('/:postId', isCreator, async(req, res) => {
    try{
        const {keyword, title, img, description} = req.body;	
        try{
            const upload = await uploadToCloudinary(img);
            const post = await api.updatePost(req.params.postId, {keyword, title, img: upload, description});
            await post.save();
            res.status(201).json(post);
        }
        catch(err){
            const error = mapErrors(err);
            res.status(400).json(error);
        }
        res.status(201).json(post);
    }
    catch(err){
        const error = mapErrors(err);
        res.status(400).json(error);
    }
});

router.get('/:postId/comments', async(req, res) => {
    try{
        const comments = await api.getComments(req.params.postId);
        res.status(200).json(comments);
    }
    catch(err){
        const error = mapErrors(err);
        res.status(400).json(error);
    }
});

router.post('/:postId/comments', isUser(), async(req, res) => {
    try{
        const {comment} = req.body;
        const commentObj = await api.addComment(req.params.postId, req.user._id, comment);
        await commentObj.save();
        res.status(201).json(commentObj);
    }
    catch(err){
        const error = mapErrors(err);
        res.status(400).json(error);
    }
});

router.post('/create', isUser(), async(req, res) => {
    try{
        const {keyword, title, img, description} = req.body;
        try{
            const upload = await uploadToCloudinary(img);
            const post = await api.createPost({keyword, title, img: upload, description});
            await post.save();
            res.status(201).json(post);
        }
        catch(err){
            const error = mapErrors(err);
            res.status(400).json(error);
        }
    }
    catch(err){
        const error = mapErrors(err);
        res.status(400).json(error);
    }
});

router.post('/:postId/like', isUser(), async(req, res) => {
    try{
        const post = await api.like(req.params.postId, req.user._id);
        res.status(201).json(post);
    }
    catch(err){
        const error = mapErrors(err);
        res.status(400).json(error);
    }
});

router.post('/:postId/comments/:commentId/like', isUser(), async(req, res) => {
    try{
        const comment = await api.likeComment(req.params.postId, req.params.commentId, req.user._id);
        res.status(201).json(comment);
    }
    catch(err){
        const error = mapErrors(err);
        res.status(400).json(error);
    }
});

module.exports = router;