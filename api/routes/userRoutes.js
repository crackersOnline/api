'use strict'
 const router = require('express').Router();
 const userController = require('../controllers/userController');
 const authController = require('../controllers/authController')

 router.route('/fetchUsers')
    .get(userController.fetchUsers)

router.route('/fetchUsers/:userID')
    .get(userController.fetchUserById)

router.route('/auth')
    .post(authController.login);

router.route('/tokenVerify')
    .post(authController.verifyToken);

router.route('/register')
    .post(userController.register);

router.route('/forgotPwd')
    .post(userController.forgotPwd)

router.route('/resetPwd')
    .put(userController.resetPwd);

router.route('/emailExist')
    .post(userController.emailExist)

router.route('/verfiyPIN') 
    .post(userController.verfiyPIN)

router.route('/addressBook')
    .get(userController.fetchAddress)
    .post(userController.saveAddressBookDetail)


module.exports = router;