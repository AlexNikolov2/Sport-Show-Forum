const router = require('express').Router();
const api = require('../services/user');
const {cookie_name, salt_rounds} = require('../config');
const mapErrors = require('../utils/mapper');
const {getFromData} = require('../utils/forms');
const {isUser} = require('../middlewares/guards');
const bcrypt = require('bcrypt');
const {createToken} = require('../utils/jwt');
const {isGuest} = require('../middlewares/guards');
const {body} = require('express-validator');
const postsApi = require('../services/post');

router.post('/register',isGuest(),
body('email')
    .trim()
    .isEmail().withMessage('Invalid email!'),
body('password')
    .trim()
    .isLength({ min: 4 }).withMessage('Password must be at least 6 characters long!'),
body('password')
    .trim()
    .custom((value, { req }) => {
        if (value && value !== req.body.repeatPassword) {
            throw new Error('Passwords don`t match!');
        }
        return true;
    }), async(req, res) => {
    try{
        const {username, email, password, repeatPassword, avatar, description} = req.body;
        const user = await api.register(username, email, password, avatar, description);
        const token = createToken({_id: user._id});
        res.cookie(cookie_name, token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7});
        res.status(201).json(user);
    }
    catch(err){
        const error = mapErrors(err);
        res.status(400).send(error);
    }
});

router.post('/login',isGuest(),
body('email')
    .trim()
    .isEmail().withMessage('Invalid email!'),
body('password')
    .trim()
    .isLength({ min: 4 }).withMessage('Password must be at least 6 characters long!'), async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await api.login(email, password);
        res.cookie(cookie_name, user);
        res.status(200).json(user);
    }
    catch(err){
        const error = mapErrors(err);
        res.status(400).send(error);
    }
});

router.get('/logout', async(req, res) => {
    try{
        res.clearCookie(cookie_name);
        res.status(204).send({message: 'User is logged out'});
    }
    catch(err){
        const error = mapErrors(err);
        res.status(400).send(error);
    }
});

router.get('/profile', isUser, async(req, res) => {
    try{
        const user = await api.getUserById(req.params.userId);
        const posts = await postsApi.getPostsByUserId(req.params.userId);
        res.status(200).send(user, posts);
    }
    catch(err){
        const error = mapErrors(err);
        res.status(400).send(error);
    }
});

module.exports = router;