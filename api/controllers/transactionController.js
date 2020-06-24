'use strict'
const transactionMgmtService = require('../services/transactionMgmtService')

const responseMessages = require('../constants/constants')['responseMessages']
const infoLogger = require('../../common/logger/infoLogger')


const saveOrder = (request, response, next) => {
  transactionMgmtService.orderSave(request)
    .then(results => {
      if(results.recCount === 0) {
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

const fetchOrderData = (request, response, next) => {
  console.log('fetchCartData', request.body)
  transactionMgmtService.fetchOrderData(request)
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



module.exports = {
  orderSave:saveOrder,
  fetchOrderData: fetchOrderData
}