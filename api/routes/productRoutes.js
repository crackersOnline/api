'use strict'
 const router = require('express').Router();
 const productController = require('../controllers/productController'); 

 router.route('/productlist')
    .get(productController.productList);

router.route('/categories')
    .get(productController.categoryList);

module.exports = router;