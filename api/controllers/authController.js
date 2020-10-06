'use strict';

const authService = require('../services/authService')
const infoLogger = require('../../common/logger/infoLogger')

const verifyToken = (request, response, next) => {
  authService.verifyToken(request)
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

const loginUser = (request, response, next) => {
  authService.loginUser(request).then(results => {
      console.log('results before cond controller', results);
       if (results.recCount === 0) {
        infoLogger.logInfo('User Details', request, responseMessages.noDataFound)
        response.status(results.code).send(results)
      } else {
        console.log('results from controller', results);
        response.status(200).send(results)
      } 
      //response.status(results.code).send(results)
    })
    .catch(error => {
      next(error)
    })
}


module.exports = {
  login: loginUser,
  verifyToken: verifyToken
}