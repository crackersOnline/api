'use strict'
const router = require('express').Router();
const transactionController = require('../controllers/transactionController')

router.route('/orderSave')
    .post(transactionController.orderSave)



module.exports = {
  orderSave = orderSave
}