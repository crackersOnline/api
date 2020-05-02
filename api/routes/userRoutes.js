'use strict'
 const router = require('express').Router();
 const userController = require('../controllers/userController');

 router.route('/Users')
    .post(userController.create)
    .get(userController.fetchUsers)
    .delete(userController.deleteAll)

router.route('/fetchUsers/:userId')
    .get(userController.fetchUserById)
    .put(userController.updateUserById)
    .delete(userController.deleteUserById)



module.exports = router;