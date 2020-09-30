'use strict'
require('dotenv').config()
const jwt = require('jsonwebtoken')

const jwtValidator = (req, res, next) => {
  if (req.url !== '/api/masterMgmt/masterMgmtHealthCheck') {
    var token = req.headers['access-token']
    if (!token) {
      res.status(401).send({ auth: false, message: 'No token provided.' })
    }

    jwt.verify(token, process.env.KEY, function (err, decoded) {
      if (err) {
        // console.log(err)

        switch (err.name) {
          case 'TokenExpiredError':
            return res.status(403).send({ auth: false, message: 'Token expired' })
          default:
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
        }
      }
      req.jwtClaims = decoded
    })
  }
  next()
}

module.exports = jwtValidator
