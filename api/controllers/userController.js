'use strict';
const userModel = require("../models/user.model");

const fetchUsers = (req, res, next) => {
    console.log('test fetchuser')
    userModel.getAll((err, data) => {
        if(err)
        res.status(500).send({
            message: 
            err.message || "some error occurred while retriveing users."
        });
        else 
        res.status(200).send(data)
    });
} 

const createUser = (req, res, next) => {
    if(!req.body) {
        res.status(400).send({
            message:
            "content cannot be empty."
        })
    }

    /*
    // Create a Customer
  const customer = new Customer({
   /* email: req.body.email,
    firstName: req.body.name,
    active: req.body.active, */
  /*  FirstName: "Mathar1",
    MiddleName: "",
    LastName: "Beevi1",
    UserEmail: "laila.mathar1@gmail.com",
    UserStatus: "Active",
    CreatedBy: 1,
    CreatedOn: "2020-04-12T18:30:00.000Z",
    UserRole: "1"
  });*/

  userModel.createUser(req.body, (err, data) => {
      if(err)
      res.status(500).send({
          message: 
          err.message || 'Some error occurred while creating the Customer'
      });
      else 
      res.status(200).send(data);
  })
}

const fetchUserById = (req, res, next) => {
    console.log("Request Param:", req.params.userId)
    userModel.getByUserID(req.params.userId, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || "some error occurred while retriveing users."
            });            
        }
        else 
        res.status(200).send(data)
    });
}
const updateUserById = (req, res, next) => {
    
}
const deleteAllUser = (req, res, next) => {
    
}
const deleteUserById = (req, res, next) => {
    
}
module.exports = {
    fetchUsers: fetchUsers,
    create: createUser,
    fetchUserById: fetchUserById,
    updateUserById: updateUserById,
    deleteAll: deleteAllUser,
    deleteUserById: deleteUserById
}