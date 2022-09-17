const { Router } = require('express');

const userController = require('../controllers/userController');
const postsController = require('../controllers/postController');

const router = Router();

router.use('/user', userController);
router.use('/posts', postsController);

module.exports = router;