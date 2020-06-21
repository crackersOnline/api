'use strict'
const cartMgmtService = require('../services/cartMgmtService')
const responseMessages = require('../constants/constants')['responseMessages']
const infoLogger = require('../../common/logger/infoLogger')

const saveCart = (request, response, next) => {
  console.log(request.body)
  cartMgmtService.tempCartSave(request)
    .then(results => {
      if (results.recCount === 0) {
        console.log('saveCart', results)
        results.message = responseMessages.noDataFound;
        infoLogger.logInfo('User Details', request, responseMessages.noDataFound)
        response.status(204).send(results)
      } else {
        response.status(200).send(results)
      }
    })
    .catch(error => {
      next(error)
  })
}


const fetchCartData = (request, response, next) => {
  console.log('fetchCartData', request.body)
  cartMgmtService.fetchCartData(request)
    .then(results => {
      console.log('saveCart', results)
      if (results.recCount === 0) {
        console.log('User Details', responseMessages.noDataFound)
        infoLogger.logInfo('User Details', request.body, responseMessages.noDataFound)
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
  saveCart: saveCart,
  fetchCartData: fetchCartData
}