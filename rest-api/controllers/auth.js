const router = require('express').Router();
const api = require('../services/auth');
const {cookie_name} = require('../config');

router.post('/register', async(req, res) => {
    try{
        const user = await api.register(req.body);
        res.status(200).send(user);
    }
    catch(err){
        const error = mapErrors(err);
        res.status(400).send(error);
    }
});

router.post('/login', async(req, res) => {
    try{
        const user = await api.login(req.body);
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