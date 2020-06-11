'use strict';
const lodash = require('lodash')
const productMgmtService = require("../services/productMgmtService")


const fetchProducts = (request, response, next) => {
    productMgmtService.getProducts(request)
      .then(results => {
        if (results.recCount === 0) {
          infoLogger.logInfo('User Details', request, responseMessages.noDataFound)
          response.status(204).send(responseMessages.noDataFound)
        } else {
          response.status(200).send(results)
        }
      })
      .catch(error => {
        next(error)
    })
}

const fetchCategories = (request, response, next) => {
    productMgmtService.getCategories(request)
    .then(results => {
      if (results.recCount === 0) {
          infoLogger.logInfo('User Details', request, responseMessages.noDataFound)
          response.status(204).send(responseMessages.noDataFound)
      } else {
          response.status(200).send(results)
      }
      })
      .catch(error => {
        next(error)
      })
}

module.exports = {
    productList: fetchProducts,
    categoryList: fetchCategories
}