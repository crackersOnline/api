'use strict'

const logger = require('../../config/logger.js')

const logInfoCompleteForGETRoute = (sso, serviceName, getURL, logInfo) => {
  logger.info(`Service: ${serviceName} with URL: ${getURL} for SSO: ${sso} with details: ${logInfo}`)
}

const logInfoompleteForPOSTRoute = (sso, serName, postURL, reqBody, logInfo) => {
  var body = JSON.stringify(reqBody)
  logger.info(`Service: ${serName} with URL: ${postURL} and data: ${body} for SSO: ${sso} with details: ${logInfo}`)
}

const logInfoComplete = (sso, serName, serRoute, logInfo) => {
  logger.info(`Service: ${serName} with route: ${serRoute} for SSO: ${sso} with details: ${logInfo}`)
}

const logInfo = (serName, req, logInfo) => {
  var sso = ''
  if (req.jwtClaims != null) {
    sso = req.jwtClaims.sso
  }
  if (req.method === 'GET') {
    logInfoCompleteForGETRoute(sso, serName, req.url, logInfo)
  } else if (req.method === 'POST') {
    logInfoompleteForPOSTRoute(sso, serName, req.url, req.body, logInfo)
  } else {
    logInfoComplete(sso, serName, req.url, logInfo)
  }
}

module.exports = {
  logInfo: logInfo
}
