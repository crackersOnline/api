
'use strict'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const authMgmtDAL = require('../dataAccess/tdDAL/authMgmtDAL')
const DBError = require('../../common/exception/dbException')

// This function gets all the list of the users
async function verifyToken (request) {
  try {
  const jwtToken = request.body.token;
  const decoded = await jwt.verify(jwtToken, process.env.SECRET_KEY)
  request.body.userID = decoded.userID
    var results = await authMgmtDAL.fetchUserByUserID(request)
    if (results) {
      if (results.recCount > 0) {
        var token = jwt.sign({userID: decoded.userID}, process.env.SECRET_KEY, { expiresIn: '1h' });
        results.token = token
        const result = {
          userName: results.users[0].userName,
          userEmail:results.users[0].userEmail,
          token: token,
          code: 200,
          recCount: results.recCount
        }
        return result
      } else {
        return { recCount: 0 }
      }
    } else {
      throw new DBError('Data not found')
    }
  } catch (error) {
    console.log('')
    throw error
  }
}


// This function gets all the list of the users
async function loginUser (request) {
  try {
    var password = request.body.password;
    var results = await authMgmtDAL.fetchUserByEmailID(request)
    if (results) {
      console.log('result', results);
      if (results.recCount > 0) {
        const userDetails = results.users[0]
        const comparisionPwd = await bcrypt.compare(password, userDetails.password);
        if(comparisionPwd) {
          var token = jwt.sign({userID: userDetails.userID}, process.env.SECRET_KEY, { expiresIn: '1h' });
          console.log('results.userName', userDetails.userName);
          const result = {
            userName: userDetails.userName,
            userEmail:userDetails.userEmail,
            token: token,
            code: 200,
            recCount: results.recCount
          }
        return result
        } else {
          const result = {
            code:409,
            message: "EmailId and Password does not match",
            recCount: results.recCount
          }
          return result
        }
      } else {
        const result = {
          code: 401,
          message: "UnAuthorized User",
          recCount: 0
        }
        return result
      }
    } else {
      throw new DBError('Data not found')
    }
  } catch (error) {
    console.log('')
    throw error
  }
}


module.exports = {
  loginUser: loginUser,
  verifyToken: verifyToken
}