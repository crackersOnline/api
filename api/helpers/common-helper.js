
'use strict'
const jwt = require('jsonwebtoken');
const userID = (req, res) => {
  return new Promise(function(resolve, reject) {
    if (req.headers && req.headers.authorization) {
      var authorization = req.headers.authorization.split(' ')[1],
          decoded;
          decoded = jwt.verify(authorization, process.env.SECRET_KEY)
          res = { userID: decoded.userID }
          resolve(decoded.userID);
    } else {
      reject({token: 'Invalid token'})
    }
    
  } )
}

module.exports = {
  userID: userID
}

