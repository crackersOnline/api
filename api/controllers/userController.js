'use strict';
const userModel = require("../models/user.model");
const helper = require('../helpers/mail.helper');
const bcrypt = require('bcrypt');

const fetchUsers = (req, res, next) => {
    console.log('test fetchuser')
    userModel.getAll((err, data) => {
        if (err) {
        res.status(500).send({
            code: 500,
            message: 
            err.message || "some error occurred while retriveing users."
        });
    } else  {
        res.status(200).send({
            code:200,
            data: data
        })
    }
    });
} 

const createUser = async (req, res, next) => {
    if(!req.body) {
        res.status(400).send({
            code: 400,
            message:
            "content cannot be empty."
        })
    }

    var password = req.body.password;
    const saltRounds = 10;
    const encryptPassword = await bcrypt.hash(password, saltRounds);


    // Create a Customer
  const customer = {
    userName: req.body.username,
    password: encryptPassword,
    userStatus: 'Active', 
  /*  FirstName: "Mathar1",
    MiddleName: "",
    LastName: "Beevi1",
    UserEmail: "laila.mathar1@gmail.com",
    UserStatus: "Active",
    CreatedBy: 1,
    CreatedOn: "2020-04-12T18:30:00.000Z",
    UserRole: "1" */
  };

  userModel.createUser(customer, (err, data) => {
      if (err) {
      res.status(500).send({
          code: 500,
          message: 
          err.message || 'Some error occurred while creating the Customer'
      });
    } else { 
      res.status(200).send({
          code: 200,
          data: data
      });
    }
  })
}

const fetchUserById = (req, res, next) => {
    console.log("Request Param:", req.params.userId)
    userModel.getByUserID(req.params.userId, (err, data) => {
        if(err) {
            res.status(500).send({
                code: 500,
                message: err.message || "some error occurred while retriveing users."
            });            
        }
        else  {
            res.status(200).send({
                code: 200,
                data: data
            })
        }
    });
}
const updateUserById = (req, res, next) => {
    
}
const deleteAllUser = (req, res, next) => {
    
}
const deleteUserById = (req, res, next) => {
    
}
const create = (req, res, next) => {
    
}
const forgotPwd = (req, res, next) => {
    if(!req.body) {
        res.status(400).send({
            code: 400,
            message:
            "EmailId cannot be empty."
        })
    }
    
const mailOptions = {
    from: process.env.MAILER_SENDERADD, // sender address
    to: req.body.userEmail, // list of receivers
    subject: 'Subject of your email', // Subject line
    html: '<p>Your html here</p>'// plain text body
  };

  
    helper.resetPwdMailer(mailOptions, (err, data) => {
        if (err) {
        res.status(500).send({
            code: 500,
            message: 
            err.message || 'Some error occurred while sending Mail'
        });
      } else { 
        res.status(200).send({
            code: 200,
            data: data
        });
      }
    })
}

const resetPwd = (req, res, next) => {
    if(!req.body) {
        res.status(400).send({
            code: 400,
            message: "Content cannot be empty."
        })
    }
    const saltRounds = 10;
    const encryptPassword = await bcrypt.hash(req.body.password, saltRounds);
    const data = {
        password: encryptPassword,
        userEmail: req.body.userEmail
    }
    userModel.resetPwd(data, (err, data) => {
        if(err) {
            req.status(500).send({
                code: 500,
                message: 
                err.message || 'Some error occurred while reseting Password'
            })
        } else {
            res.status(200).send({
                code: 200,
                data: data
            })
        }
    })

}
module.exports = {
    fetchUsers: fetchUsers,
    register: createUser,
    fetchUserById: fetchUserById,
    updateUserById: updateUserById,
    deleteAll: deleteAllUser,
    deleteUserById: deleteUserById,
    create: create,
    forgotPwd: forgotPwd,
    resetPwd: resetPwd
}