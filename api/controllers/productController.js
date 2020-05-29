'use strict';
const lodash = require('lodash')
const productModel = require("../models/product.model")

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
        var masterData = lodash.groupBy(data, 'categoryName');
        // var masterData = lodash.mapValues(lodash.groupBy(data, 'categoryID'),
        // clist => clist.map(row => lodash.omit(row, 'categoryID')));     
        console.log("clist",masterData);   
        res.status(200).send({
            code:200,
            data: Object.entries(masterData)
        })
    }
    });
}
const categoryList = (req, res, next) => {
    console.log('test categoryList')
    productModel.getcategories((err, data) => {
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
    productList: productList,
    categoryList: categoryList
}