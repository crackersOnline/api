'use strict'
 const router = require('express').Router();
 const userController = require('../controllers/userController');
 const authController = require('../controllers/authController')

 router.route('/Users')
    .post(userController.create)
    .get(userController.fetchUsers)
    .delete(userController.deleteAll)

router.route('/fetchUsers/:userId')
    .get(userController.fetchUserById)
    .put(userController.updateUserById)
    .delete(userController.deleteUserById)

router.route('/auth')
    .post(authController.login);

router.route('/tokenVerify')
    .post(authController.verifyToken);

router.route('/register')
    .post(userController.register);

router.route('/forgotPwd')
    .post(userController.forgotPwd)

router.route('/resetPwd')
    .post(userController.resetPwd);

router.route('/emailExist')
    .post(userController.emailExist)

module.exports = router;