const { Router } = require('express');

const authController = require('../controllers/auth');

const router = Router();

router.use('/user', authController);

module.exports = router;