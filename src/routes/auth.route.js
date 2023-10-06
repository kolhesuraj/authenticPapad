const express = require('express');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Routes: register user, login
router.post('/register', validate(authValidation.registerUser), authController.registerUser);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/register/:provider', authController.socialRegistration);
router.post('/social/login/:provider', authController.socialLogin);

module.exports = router;