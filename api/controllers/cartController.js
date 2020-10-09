'use strict'
const cartMgmtService = require('../services/cartMgmtService')
const responseMessages = require('../constants/constants')['responseMessages']
const infoLogger = require('../../common/logger/infoLogger')

const saveCart = (request, response, next) => {
  cartMgmtService.tempCartSave(request)
    .then(results => {
      if (results.recCount === 0) {
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
  cartMgmtService.fetchCartData(request)
    .then(results => {
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

const fetchCoupon = (request, response, next) => {
   cartMgmtService.fetchCoupon(request)
     .then(results => {
       if (results.recCount === 0) {
        results.code = 202;
         console.log('User Details', responseMessages.noDataFound)
         infoLogger.logInfo('User Details', request.body, responseMessages.noDataFound)
         response.status(202).send(results)
       } else {
         response.status(200).send(results)
       }
     })
     .catch(error => {
       next(error)
   })
 }
 
 const saveOrder = (request, response, next) => {
  request.body.orderRefID = 'CO#' + Math.floor(Math.random()*90000) + 10000;
   cartMgmtService.saveOrder(request)
    .then(results => {
      if(results.recCount === 0) {
        response.status(204).send(results)
      } else {
        results.data.orderAmount =  request.body.orderAmount;
        results.data.orderRefID = request.body.orderRefID;
        response.status(200).send(results)
      }
    }).catch(error => {
      next(error)
    })
 }


module.exports = {
  saveCart: saveCart,
  fetchCartData: fetchCartData,
  fetchCoupon: fetchCoupon,
  saveOrder: saveOrder
}