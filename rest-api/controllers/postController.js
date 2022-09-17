const {Router} = require('express');

const isLogged = require('../middlewares/isLogged');
const { createPost, getPostById } = require('../services/postService');

const router = new Router();

router.post('/create', isLogged(), async (req, res) => {
    try{
        const post = {
            title: req.body.title,
            imageURL: req.body.imageURL,
            description: req.body.description
        }
        await createPost(post);
        res.status(201).send(post);
    }
    catch (error) {
        res.status(400).send({message: error.message});
    }
});
router.get('/:id', async (req, res) => {
    try{
        const post = await getPostById(req.params.id);
        res.status(200).send(post);
    }
    catch(error){
        console.log(error.message);
        res.status(400).send({message: error.message});
    }
});
router.put('/:id', isLogged(), async (req, res) => {
    try{
        const newPost = {
            title: req.body.title,
            imageURL: req.body.imageURL,
            description: req.body.description
        }
        const id = req.params.id;
        const oldPost = await getPostById(id);
        Object.assign(oldPost, newPost);
        await oldPost.save();
        res.status(200).send(oldPost);
    }
    catch(error){
        console.log(error.message);
        res.status(400).send({message: error.message});
    }
});
router.delete('/:id', isLogged(), async (req, res) => {
    try{
        const post = await getPostById(req.params.id);
        Object.assign(post, {isDeleted: true});
        await post.save();
        res.status(200).send(post);
    }
    catch(error){
        console.log(error);
        res.status(400).send({message: error.message});
    }
});

module.exports = router;
