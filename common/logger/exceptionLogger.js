'use strict'

const logger = require('../../../../peacock/pavo_masterMgmt_api/config/logger.js')

const logExceptionCompleteForGETRoute = (sso, serviceName, getURL, errStack) => {
  logger.error(`Error in service: ${serviceName} with URL: ${getURL} for SSO: ${sso} with error details: ${errStack}`)
}

const logExceptionCompleteForPOSTRoute = (sso, serName, postURL, reqBody, errStack) => {
  var body = JSON.stringify(reqBody)
  logger.error(`Error in service: ${serName} with URL: ${postURL} and data: ${body} for SSO: ${sso} with error details: ${errStack}`)
}

const logExceptionComplete = (sso, serName, serRoute, errStack) => {
  logger.error(`Error in service: ${serName} with route: ${serRoute} for SSO: ${sso} with error details: ${errStack}`)
}

const logException = (serName, req, errStack) => {
  var sso = ''
  if (req.jwtClaims != null) {
    sso = req.jwtClaims.sso
  }
  if (req.method === 'GET') {
    logExceptionCompleteForGETRoute(sso, serName, req.url, errStack)
  } else if (req.method === 'POST') {
    logExceptionCompleteForPOSTRoute(sso, serName, req.url, req.body, errStack)
  } else {
    logExceptionComplete(sso, serName, req.url, errStack)
  }
}

module.exports = {
  logException: logException
}
