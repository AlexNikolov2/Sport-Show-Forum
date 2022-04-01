const {getUserById} = require('../services/user'); 

async function isCreator(req, res, next){
    const user = await getUserById(req.user.id);
    if(user.id !== req.params.id){
        return res.status(403).json({
            message: 'You are not allowed to do this action'
        });
    }
    next();
}


module.exports = {
    isAuth,
    isGuest,
    isCreator
};