'use strict';
const userModel = require("../models/user.model");
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
module.exports = {
    fetchUsers: fetchUsers,
    register: createUser,
    fetchUserById: fetchUserById,
    updateUserById: updateUserById,
    deleteAll: deleteAllUser,
    deleteUserById: deleteUserById,
    create: create
}