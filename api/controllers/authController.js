'use strict';
const authModel = require('../models/auth.model')
const jwt = require('jsonwebtoken');


const loginUser = (req, res, next) => {
  if(!req.body) {
    req.status(400).send({
      message: "content cannot be empty"
    })
  }
  authModel.loginUser(req.body, (err, data) => {
    if(err) {
      res.status(500).send({
        message: 
        err.message || 'Some error occurred while creating the Customer'
      })
    } else {
      if(data.length == 0) {
        res.status(401).send({
          message: "UnAuthorized User"
        })
      } else if(data.length>0) {
        var token = jwt.sign({userID: data.userID}, process.env.SECRET_KEY, { expiresIn: '2h' });
        res.status(200).send({token});
      }
    }
  })

}

module.exports = {
  login: loginUser
}