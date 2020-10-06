'use strict'
const myaccountService = require('../services/myaccountService.js')
const responseMessages = require('../constants/constants')['responseMessages']
const infoLogger = require('../../common/logger/infoLogger')

const fetchMyprofile = (request, response, next) => {
    myaccountService.fetchUserByEmailID(request)
    .then(results => {
        if (results.recCount === 0) {
          infoLogger.logInfo('Fetch My profile', request.body, responseMessages.noDataFound)
          response.status(204).send(responseMessages.noDataFound)
        } else {
            response.status(200).send(results)
        }
    }).catch(error => {
        next(error)
    })
}

const fetchMyOrders = (request, response, next) => {
    myaccountService.fetchOrdersByUserID(request)
      .then(results => {
        if (results.recCount === 0) {
          infoLogger.logInfo('Fetch My Order', request.body, responseMessages.noDataFound)
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
    fetchMyprofile: fetchMyprofile,
    fetchMyOrders: fetchMyOrders
  }