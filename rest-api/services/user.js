const User = require('../models/user');
const {hash, compare} = require('bcrypt');
const jwt = require('jsonwebtoken');


const {secret, salt_rounds} = require('../config');

async function getUserById(userId) {
    return await User.findById(userId);
}

async function getUserByEmail(email) {
    return await User.findOne({ email /*{$regex: new RegExp(`^${email}$`, 'i') }*/ }).lean();
}

async function getUserByUsername(username){
    return await User.findOne({ username: {$regex: new RegExp(`^${username}$`, 'i') } }).lean();
}

async function login(email, password){
    let user = await getUserByEmail(email);
    if(!user){
        throw new Error('There is not such a motherfucker here!');
    }
    const matched = await compare(password, user.password);
    if(!matched){
        throw new Error('Invalid email or password');
    }
    const token = jwt.sign({email: user.email, _id: user._id}, secret);
    return token;
}

async function register(username, email, password, repeatPassword, avatar, description){
    let userEmail = await getUserByEmail(email);
    let userName = await getUserByUsername(username);
    if(userEmail || userName){
        throw new Error('User already exists');
    }
    const hashedPassword = await hash(password, salt_rounds);
    let user = new User({
        username,
        email,
        password: hashedPassword,
        avatar,
        description,
        posts: []
    });
    return user.save();
}

module.exports = {
    getUserById,
    getUserByEmail,
    getUserByUsername,
    login,
    register
};