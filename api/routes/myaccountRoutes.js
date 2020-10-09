'use strict'
const router = require('express').Router();
const myaccountController = require('../controllers/myaccountController')

router.route('/fetchMyprofile')
    .get(myaccountController.fetchMyprofile);

router.route('/fetchMyOrders')
    .get(myaccountController.fetchMyOrders);

router.route('/fetchDeliveryAddress')
    .post(myaccountController.fetchDeliveryAddressByID);


module.exports = router
