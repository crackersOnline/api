'use strict';
const productModel = require("../models/product.model");

const productList = (req, res, next) => {
    console.log('test productList')
    productModel.getProducts((err, data) => {
        if (err) {
        res.status(500).send({
            code: 500,
            message: 
            err.message || "some error occurred while retriveing users."
        });
    } else  {
        res.status(200).send({
            code:200,
            data: data
        })
    }
    });
} 


module.exports = {
    productList: productList
}