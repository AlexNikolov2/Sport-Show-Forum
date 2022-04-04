const router = require('express').Router();
const api = require('../services/user');
const {cookie_name} = require('../config');
const  {uploadToCloudinary} = require('../utils/cloudinary');
const mapErrors = require('../utils/mapper');
const formidable = require('formidable');
const {getFromData} = require('../utils/forms');
const {isUser} = require('../middlewares/guards');

router.post('/register', async(req, res) => {
    try{
        const imageURL = [];
        const form = formidable({ multiples: false });
        const [formData, incFiles] = await getFromData(req, form);

        for (const file of Object.values(incFiles)) {
            const url = await uploadToCloudinary(file.path);
            imageURL.push(url);
        }
        formData.img = imageURL;
        const user = await api.register(formData, imageURL);
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