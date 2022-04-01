const {getUserById} = require('../services/user'); 

function isUser() {
    return function (req, res, next) {
        if (req.user) {
            next();
        } else {
            res.status(401).json({message: 'Log in ffs'});
        }
    };
}

function isGuest() {
    return function (req, res, next) {
        if (!req.user) {
            next();
        } else {
            res.status(400).json({message: 'You are already logged in'});
        }
    };
}

async function isCreator(req, res, next){
    const user = await getUserById(req.user._id);
    if(user.id !== req.params.id){
        return res.status(403).json({
            message: 'You are not allowed to do this action'
        });
    }
    next();
}


module.exports = {
    isUser,
    isGuest,
    isCreator
};