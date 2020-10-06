'use strict';
const lodash = require('lodash')
const productMgmtService = require("../services/productMgmtService")
const svgCaptcha = require('svg-captcha')


const fetchProducts = (request, response, next) => {
    productMgmtService.getProducts(request)
      .then(results => {
        console.log('controller', results);
        if (results.recCount === 0) {
          infoLogger.logInfo('Product Details', request, responseMessages.noDataFound)
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
          infoLogger.logInfo('Categories Details', request, responseMessages.noDataFound)
          response.status(204).send(responseMessages.noDataFound)
      } else {
          response.status(200).send(results)
      }
      })
      .catch(error => {
        next(error)
      })
}

const generateCaptcha = (request, response, next) => {
  // const expr = random.mathExpr();
  // const text = expr.text; const data = createCaptcha(expr.equation, options); return {text, data};
  const Options = {
    width:"105"
  }
  var captcha = svgCaptcha.create(Options);
  // captcha = svgCaptcha(captcha,Options);
  // request.session.captcha = captcha.text;
  // response.type('jpg');
  console.log('captcha');
  response.status(200).send(captcha)
}

module.exports = {
    productList: fetchProducts,
    categoryList: fetchCategories,
    generateCaptcha: generateCaptcha
}