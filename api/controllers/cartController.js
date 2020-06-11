'use strict'
const cartMgmtService = require('../services/cartMgmtService')

const saveCart = (request, response, next) => {
  cartMgmtService.tempCartSave(request)
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
  saveCart: saveCart,
}