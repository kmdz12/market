const express = require('express');
const router = express.Router();
const { authController } = require('../controller/auth/AuthController.js');

router.route('/register')
    .post(authController.register)

router.route('/login')
    .post(authController.login)

router.route('/currentUser')
    .get(authController.checkLoggedUser)

router.route('/userStatus')
    .get(authController.isUserAuth)

module.exports = router;