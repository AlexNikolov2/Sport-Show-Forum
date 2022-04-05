const router = require('express').Router();
const api = require('../services/user');
const {cookie_name, salt_rounds} = require('../config');
const mapErrors = require('../utils/mapper');
const {getFromData} = require('../utils/forms');
const {isUser} = require('../middlewares/guards');
const bcrypt = require('bcrypt');
const {createToken} = require('../utils/jwt');

router.post('/register', async(req, res) => {
    try{
        const {username, email, password, repeatPassword, avatar, description} = req.body;
        if(password !== repeatPassword){
            throw new Error('Passwords do not match');
        }
        const hashedPassword = await bcrypt.hash(password, salt_rounds);
        const user = await api.register(username, email, {password: hashedPassword}.toString(), avatar, description);
        const token = createToken({_id: user._id});
        res.cookie(cookie_name, token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7});
        res.status(201).send(user);
    }
    catch(err){
        const error = mapErrors(err);
        res.status(400).send(error);
    }
});

router.post('/login', async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await api.login(email, password);
        const token = createToken({ id: user._id });
        res.cookie(cookie_name, token, {httpOnly: true});
        res.status(200).send(user);
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
        res.status(200).send(user);
    }
    catch(err){
        const error = mapErrors(err);
        res.status(400).send(error);
    }
});

module.exports = router;