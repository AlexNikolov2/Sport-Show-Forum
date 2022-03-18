//import service

const isAuth = () => {
    return (req, res, next) => {
        if (req.user !== undefined) {
            next();
        } else {
            res.redirect('/');//to login
        }
    };
};

const isGuest = () => {
    return (req, res, next) => {
        if (req.user == undefined) {
            next();
        } else {
            res.redirect('/');
        }
    };
};

const isCreator = () => async (req, res, next) => {
};


module.exports = {
    isAuth,
    isGuest,
    isCreator
};