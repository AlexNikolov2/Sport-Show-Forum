const {Router} = require('express');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

const { COOKIE_NAME, SALT_ROUNDS } = require('../config');
const { createToken } = require('../utils/jwt');
const isLogged = require('../middlewares/isLogged');
const { createUser, getUserById, getUserByEmail } = require('../services/userService');