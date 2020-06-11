'use strict';
/*
const userModel = require("../models/user.model");
const helper = require('../helpers/mail.helper');
const bcrypt = require('bcrypt');
*/
const userMgmtService = require("../services/userMgmtService")
const responseMessages = require("../constants/constants")['responseMessages']

// This function gets all the list of the users
const fetchUsers = (request, response, next) => {
    userMgmtService.fetchUsers(request)
      .then(results => {
        if (results.recCount === 0) {
          infoLogger.logInfo('User Details', request, responseMessages.noDataFound)
          response.status(204).send(responseMessages.noDataFound)
        } else {
          response.status(200).send(results)
        }
      })
      .catch(error => {
        next(error)
      })
  }

  
  // This function is used to insert new user
  const createUser = (request, response, next) => {
    userMgmtService.createUser(request)
      .then(results => {
        if (results.recCount === 0) {
          infoLogger.logInfo('User Mgmt - Insert', request, responseMessages.noDataFound)
          response.status(204).send(responseMessages.noDataFound)
        } else {
          response.status(results.code).send(results)
        }
      })
      .catch(error => {
        next(error)
      })
  }
  
  // This function is used to update the user
  const updateUser = (request, response, next) => {
    userMgmtService.updateUser(request)
      .then(results => {
        if (results.recCount === 0) {
          infoLogger.logInfo('User Mgmt - Update', request, responseMessages.noDataFound)
          response.status(204).send(responseMessages.noDataFound)
        } else {
          response.status(results.code).send(results)
        }
      })
      .catch(error => {
        next(error)
      })
  }
  
  
  // This function is used to get data from ModuleMaster
  const deleteUser = (request, response, next) => {
    userMgmtService.deleteuser(request)
      .then(results => {
        if(results.recCount === 0) {
          infoLogger.logInfo('User Mgmt - Delete', request, responseMessages.noDataFound)
          response.status(204).send(responseMessages.noDataFound)
        } else {
          response.status(results.code).send(results)
        }
      })
      .catch(error => {
        next(error)
      })
  }

  
  
const fetchUserById = (request, response, next) => {
    console.log("Request Param:", request.params.userID)
    userMgmtService.fetchUsersByUserID(request)
    .then(results => {
        if(results.recCount === 0) {
          infoLogger.logInfo('User Mgmt - Delete', request, responseMessages.noDataFound)
          response.status(204).send(responseMessages.noDataFound)
        } else {
          response.status(results.code).send(results)
        }
      })
      .catch(error => {
        next(error)
      })
}

  
const forgotPwd = (request, response, next) => {
    console.log("Request Param:", request.params.userID)
    userMgmtService.forgotPwd(request)
    .then(results => {
        if(results.recCount === 0) {
          infoLogger.logInfo('User Mgmt - Delete', request, responseMessages.noDataFound)
          response.status(204).send(responseMessages.noDataFound)
        } else {
          response.status(results.code).send(results)
        }
      })
      .catch(error => {
        next(error)
      })
}

const resetPwd = (request, res, next) => {
    userMgmtService.resetPwd(request)
    .then(results => {
        if(results.recCount === 0) {
          infoLogger.logInfo('User Mgmt - Delete', request, responseMessages.noDataFound)
          response.status(204).send(responseMessages.noDataFound)
        } else {
          response.status(results.code).send(results)
        }
      })
      .catch(error => {
        next(error)
      })
}


const emailExist = (request, response, next) => {
  request.body.userStatus = 'Active';
  userMgmtService.emailExist(request)
  .then(results => {
    response.status(200).send(results)
    })
    .catch(error => {
      next(error)
    })
}



const verfiyPIN = (request, response, next) => {
  req.body.userStatus = 'Inactive';
  userMgmtService.verfiyPIN(request)
  .then(results => {
      if(results.recCount === 0) {
        infoLogger.logInfo('User Mgmt - Delete', request, responseMessages.noDataFound)
        response.status(204).send(responseMessages.noDataFound)
      } else {
        response.status(results.code).send(results)
      }
    })
    .catch(error => {
      next(error)
    })
}





module.exports = {
    fetchUsers: fetchUsers,
    register: createUser,
    fetchUserById: fetchUserById,
    forgotPwd: forgotPwd,
    resetPwd: resetPwd,
    emailExist: emailExist,
    verfiyPIN: verfiyPIN
}