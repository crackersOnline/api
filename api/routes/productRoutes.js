'use strict'
 const router = require('express').Router();
 const productController = require('../controllers/productController'); 

 router.route('/productlist')
    .get(productController.productList);

module.exports = router;