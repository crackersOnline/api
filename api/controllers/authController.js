'use strict';
const authModel = require('../models/auth.model')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const verifyToken = async (req, res, next) => {
  try {
  const jwtToken = req.body.token;
  const decoded = await jwt.verify(jwtToken, process.env.SECRET_KEY)
    console.log('authorization- userID', decoded);
    // Fetch the user by id 
    userModel.getByUserID(decoded.userID, (err, data) => {
      if(err) {
          res.status(500).send({
              code: 500,
              message: err.message || "some error occurred while retriveing users."
          });            
      } else  {
        var token = jwt.sign({userID: decoded.id}, process.env.SECRET_KEY, { expiresIn: '1000' });
        var result = {
          userName: data[0].userName,
          token: token,
          code: 200
        }
        res.status(200).send(result);
      } 
  });
} catch (e) {
  console.error('e', e);
  res.status(401).send({
    code: 401,
    message: "UnAuthorized User1"
  })
}
}

const loginUser = (req, res, next) => {
  console.log(req.body);
  if(!req.body) {
    req.status(400).send({
      code: 400,
      message: "content cannot be empty"
    })
  }
  var password = req.body.password;
  authModel.loginUser(req.body, async (err, data) => {
    if(err) {
      res.status(500).send({
        code: 500,
        message: 
        err.message || 'Some error occurred while creating the Customer'
      })
    } else {
      if(data.length == 0) {
        res.status(401).send({
          code: 401,
          message: "UnAuthorized User"
        })
      } else if(data.length>0) {
        const comparisionPwd = await bcrypt.compare(password, data[0].password);
        if(comparisionPwd) {
          var token = jwt.sign({userID: data[0].userID}, process.env.SECRET_KEY, { expiresIn: '1000' });
          console.log('data.userName', data[0].userName);
          var result = {
            userName: data[0].userName,
            token: token,
            code: 200
          }
          res.status(200).send(result);
        } else {
          res.status(409).send({
            code:409,
            message: "EmailId and Password does not match"
          })
        }
      }
    }
  })

}


module.exports = {
  login: loginUser,
  verifyToken: verifyToken
}