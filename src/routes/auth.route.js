const express = require('express');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Routes: register user
router.post('/register', validate(authValidation.registerUser), authController.registerUser);
router.post('/register/:provider', validate(authValidation.socialLogin), authController.socialRegistration);
// Routes: register admin
router.post('/register/admin', validate(authValidation.registerUser), authController.registerAdmin);
// Router: Login admin, user
router.post('/login', validate(authValidation.login), authController.login);
router.post('/login/admin', validate(authValidation.login), authController.AdminLogin);
router.post('/social/login/:provider/admin', validate(authValidation.socialLogin), authController.socialAdminLogin);
router.post('/social/login/:provider', validate(authValidation.socialLogin), authController.socialUserLogin);


module.exports = router;