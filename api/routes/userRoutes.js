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

module.exports = router;