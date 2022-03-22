const User = require('../models/user');
const {hash, compare} = require('bcrypt');

const {secret, salt_rounds} = require('../config');

async function getUserById(userId) {
    return await User.findById(userId);
}

async function getUserByEmail(email) {
    return await User.findOne({ email: {$regex: new RegExp(`^${email}$`, 'i') } }).lean();
}

async function login(email, password){
    const user = await getUserByEmail(email);
    if(!user){
        throw new Error('User not found');
    }
    const matched = await compare(password, user.password);
    if(!matched){
        throw new Error('Invalid email or password');
    }
    const token = jwt.sign({email: user.email, _id: user._id}, secret);
    return token;
}

async function register(username, email, password){
    let user = await getUserByEmail(email);
    if(user){
        throw new Error('User already exists');
    }
    user = new User({
        username,
        email,
        hashedPassword: await hash(password),
        posts: []
    });
    return await user.save();
}