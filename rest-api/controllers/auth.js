const router = require('express').Router();
const api = require('../services/user');
const {cookie_name} = require('../config');
const  {uploadToCloudinary} = require('../utils/cloudinary');
const mapErrors = require('../utils/mapper');

router.post('/register', async(req, res) => {
    try{
        const {username, email, password, img, description} = req.body;
        try{
            const file = req.body.img;
            const upload = await uploadToCloudinary(file);
            return upload;
        }
        catch(err){
            const error = mapErrors(err);
            res.status(400).send(error);
        }
        const user = await api.register({username, email, password, img: upload, description});
        const token = user.createToken({ id: user._id });
        res.cookie(cookie_name, token, {httpOnly: true});
        res.status(200).send(user);
    }
    catch(err){
        const error = mapErrors(err);
        res.status(400).send(error);
    }
});

router.post('/login', async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await api.login({email, password});
        const token = user.createToken({ id: user._id });
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

router.get('/profile', async(req, res) => {
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