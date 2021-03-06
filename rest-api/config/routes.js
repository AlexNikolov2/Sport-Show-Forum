const { Router } = require('express');

const authController = require('../controllers/auth');
const postController = require('../controllers/post');

const router = Router();

router.use('/user', authController);
router.use('/posts', postController);

module.exports = router;