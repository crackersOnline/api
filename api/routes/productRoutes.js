'use strict'
 const router = require('express').Router();
 const productController = require('../controllers/productController'); 
 const cartController =  require('../controllers/cartController')

 router.route('/productlist')
    .get(productController.productList);

router.route('/categories')
    .get(productController.categoryList);

router.route('/cartsave')
    .post(cartController.saveCart)

router.route('/getCartData')
    .get(cartController.fetchCartData)

router.route('/getCoupon')
    .post(cartController.fetchCoupon)

router.route('/orderSave')
    .post(cartController.saveOrder)

module.exports = router;