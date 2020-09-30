'use strict'
// var appRoot = require('app-root-path')
const winston = require('winston')
// define the custom settings for each transport (file, console)
// var options = {
//   file: {
//     level: 'info',
//     filename: `${appRoot}/logs/app.log`,
//     handleExceptions: true,
//     json: true,
//     maxsize: 5242880, // 5MB
//     maxFiles: 5,
//     colorize: false
//   },
//   console: {
//     level: 'debug',
//     handleExceptions: true,
//     json: false,
//     colorize: true
//   }
// }

const loggerArgs = {
  transports: [
    new (winston.transports.Console)({ timestamp: true })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ timestamp: true })
  ]
}

const logger = new (winston.Logger)(loggerArgs)
// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message)
  }
}

module.exports = logger
