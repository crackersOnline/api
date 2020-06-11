'use strict'
require('dotenv').config()
const logger = require('../../config/logger.js')

const logAudit = (sso, funName, msg) => {
  if (process.env.AUDITLOG === 1) {
    logger.info('Audit: for SSO: {0} in function: {1} with msg: {2}', sso, funName, msg)
  }
}

module.exports = {
  logAudit: logAudit
}
