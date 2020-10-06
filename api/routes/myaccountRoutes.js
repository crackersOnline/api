'use strict'
const router = require('express').Router();
const myaccountController = require('../controllers/myaccountController')

router.route('/fetchMyprofile')
    .get(myaccountController.fetchMyprofile);

router.route('/fetchMyOrders')
    .get(myaccountController.fetchMyOrders);


module.exports = router
