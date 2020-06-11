'use strict'
const userMgmtDAL = require('../dataAccess/tdDAL/userMgmtDAL')
const _ = require('lodash')
const DBError = require('../../common/exception/dbException')
const helper = require('../helpers/mail.helper');
const bcrypt = require('bcrypt');

// This function gets all the list of the users
async function fetchUsers (request) {
  try {
    var results = await userMgmtDAL.fetchUsers(request)
    if (results) {
      if (results.recCount > 0) {
        return results
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


const sendMail = (mailOptions) => {
  helper.sendMailer(mailOptions, (err, data) => {
      if (err) {
      console.log('err in userCOntroller', err);
      return err;
      } else { 
          console.log('mail return', data);
      return data;
      }
  })
}

// Function is used to insert the user
async function createUser (request) {
  var results = {}
  try {
    let password = request.body.password;
    let saltRounds = 10;
    let generatePIN = Math.floor(1000 + Math.random()*9000);
    request.body.password = await bcrypt.hash(password, saltRounds);
    request.body.activationPIN = await bcrypt.hash('"'+ generatePIN +'"', saltRounds);
    request.body.userStatus =  'Inactive'
    request.body.createdBy = 1 // loginuser

    var data = await userMgmtDAL.createUser(request)
    if (data) {
      const mailOptions = {
        from: process.env.MAILER_SENDERADD, // sender address
        to: request.body.userEmail, // list of receivers
        subject: 'Registration activation PIN', // 'Subject of your email', // Subject line
        html: '<p> Your generated PIN '+ generatePIN + '</p>'// '<p>Your html here</p>'// plain text body
      };
      const mailer = await helper.sendMailer(mailOptions)
      if(mailer) {
        data.userSave.userEmail = request.body.userEmail
        results = {
          code: 200,
          data: data.userSave,
          recCount:data.userSave.affectedRows
        }
        return results;
      } else {
        throw new DBError('Mail not sent')
      }
      } else {
        throw new DBError('Data not found')
      }
  } catch (error) {
    console.log(error)
    throw error
  }
}


// Function is used to update the user
async function updateUser (request) {
  var results = {}
  try {
    var data = await userMgmtDAL.updateUser(request)
    if (data) {
      results = { RecordCount: data.userSave.affectedRows }
      return results
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

// Function is used to delete the user
async function deleteUser (request) {
  var results = {}
  try {
    var data = await userMgmtDAL.deleteUser(request)
    if (data) {
      results = { RecordCount: data.userSave.affectedRows }
      return results
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

// Function is used to get particular user detail
async function fetchUserByUserID (request) {
  try {
    var results = await userMgmtDAL.fetchUserByUserID(request)
    if (results) {
      if (results.recCount > 0) {
        return results
      } else {
        return { recCount: 0 }
      }
    } else {
      throw new DBError('Data not found')
    }
  }
  catch (error) {
    console.log(error)
    throw error
  }
}


async function forgotPwd (req) {
    var results = {}
    try {
    const mailOptions = {
        from: process.env.MAILER_SENDERADD, // sender address
        to: req.body.userEmail, // list of receivers
        subject: 'Subject of your email', // Subject line
        html: '<p>Your html here</p>'// plain text body
      };
      const mailer = await helper.sendMailer(mailOptions)
      if(mailer) {
        results = {
          code: 200,
          data: data,
          recCount: 1
        }
        return results;
      } else {
        throw new DBError('Mail not sent')
      } 
  }
    catch (error) {
      console.log(error)
      throw error
    }
  }
  

// Function is used to insert the user
async function resetPwd (request) {
  var results = {}
  try {
    let password = request.body.password;
    let saltRounds = 10;
    request.body.password = await bcrypt.hash(password, saltRounds);
    request.body.userStatus =  'active'
    request.body.createdBy = 1 // loginuser

    var data = await userMgmtDAL.updateUser(request)
    if (data) {
      const mailOptions = {
        from: process.env.MAILER_SENDERADD, // sender address
        to: request.body.userEmail, // list of receivers
        subject: 'Registration activation PIN', // 'Subject of your email', // Subject line
        html: '<p> Your generated PIN '+ generatePIN + '</p>'// '<p>Your html here</p>'// plain text body
      };
      const mailer = await helper.sendMailer(mailOptions)
      if(mailer) {
        results = {
          code: 200,
          data: data.userSave,
          recCount:data.userSave.affectedRows
        }
        return results;
      } else {
        throw new DBError('Mail not sent')
      }
      } else {
        throw new DBError('Data not found')
      }
  } catch (error) {
    console.log(error)
    throw error
  }
}


// Function is used to get particular user detail
async function emailExist (request) {
  try {
    request.body.userStatus = 'Active'
    var results = await userMgmtDAL.emailExist(request)
    console.log('emailExist - service', results);
    if (results) {
      if (results.recCount > 0) {
        return results
      } else {
        return { recCount: 0 }
      }
    } else {
      throw new DBError('Data not found')
    }
  }
  catch (error) {
    console.log(error)
    throw error
  }
}

// Function is used to get particular user detail
async function verfiyPIN (request) {
  try {
    var result = {}
    request.body.userStatus = 'Inactive';
    var results = await userMgmtDAL.emailExist(request)
    if (results) {
      if (results.recCount > 0) {
        const comparePIN = await bcrypt.compare(request.body.activationPIN, results.user[0].activationPIN);
        if(comparePIN) {
          await userModel.updateStatus(request.body);
          result = {
              code: 200,
              message: 'sucess',
              recCount: results.recCount
          }
          return result;
        } else {
          result = {
            code: 409,
            message: "PIN number does not match",
            recCount: results.recCount
        }
        return result;
        }
      } else {
        result = {
          code: 401,
          message: "Email ID does not exist",
          recCount: results.recCount
        }
        return result
      }
    } else {
      throw new DBError('Data not found')
    }
  }
  catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = {
  fetchUsers: fetchUsers,
  createUser: createUser,
  updateUser: updateUser,
  deleteuser: deleteUser,
  fetchUserByUserID: fetchUserByUserID,
  forgotPwd: forgotPwd,
  resetPwd: resetPwd,
  emailExist: emailExist,
  verfiyPIN:verfiyPIN
}
