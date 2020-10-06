'use strict'
const userMgmtDAL = require('../dataAccess/tdDAL/userMgmtDAL')
const _ = require('lodash')
const DBError = require('../../common/exception/dbException')
const mailHelper = require('../helpers/mail.helper');
const commonHelper = require('../helpers/common-helper');
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
    // console.log('')
    throw error
  }
}


const sendMail = (mailOptions) => {
  mailHelper.sendMailer(mailOptions, (err, data) => {
      if (err) {
      // console.log('err in userCOntroller', err);
      return err;
      } else { 
          // console.log('mail return', data);
      return data;
      }
  })
}

// Function is used to insert the user
async function createUser (request) {
  var results = {}
  var userDetail  = '';
  try {
    let password = request.body.password;
    let saltRounds = 10;
    let generatePIN =  Math.floor(1000 + Math.random()*9000)
    request.body.password = await bcrypt.hash(password, saltRounds);
    // console.log('generatePIN', generatePIN, saltRounds)
    request.body.activationPIN = await bcrypt.hash(generatePIN.toString(), saltRounds);
    request.body.userStatus =  'Inactive'
    request.body.createdBy = 1 // loginuser
    request.body.updatedBy = 1 // loginuser

    const checkEmailExist = await userMgmtDAL.emailExist(request);
    // console.log('checkEmailExist',checkEmailExist);
    if(checkEmailExist.recCount > 0) {
      userDetail  = await userMgmtDAL.updateUser(request)
      // console.log('checkEmailExist', request.body)
    } else {
      userDetail = await userMgmtDAL.createUser(request)
     // console.log('checkEmailNonExist ', request.body)
    }
    if (userDetail) {
      const mailOptions = {
        from: process.env.MAILER_SENDERADD, // sender address
        to: request.body.userEmail, // list of receivers
        subject: 'Registration activation PIN', // 'Subject of your email', // Subject line
        html: '<p> Your generated PIN '+ generatePIN + '</p>'// '<p>Your html here</p>'// plain text body
      };
   //   const mailer = await mailHelper.sendMailer(mailOptions);

   console.log('mailer func')
      const mailer = await mailHelper.mail.send({
  template: 'activationUser',
  message: {
    from: 'santusend@gmail.com',
    // to: 'laila.mathar@gmail.com'
    to:request.body.userEmail    
  },
  locals: {
    fname: 'Moor',
    lname: 'Santu',
    generatePIN: generatePIN,
    userEmailID:request.body.userEmail
  }
})
        
        if(mailer) {
          console.log('email has been send');
          userDetail.userSave.userEmail = request.body.userEmail
        results = {
          code: 200,
          data: userDetail.userSave,
          recCount: userDetail.userSave.affectedRows
        }
        console.log('result', results);
        return results;
        } else {
          console.log('Mail not sent');
          throw new DBError('Mail not sent')
        }
      } else {
        console.log('data not found')
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
    // console.log(error)
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
    // console.log(error)
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
    // console.log(error)
    throw error
  }
}


async function forgotPwd (request) {
    var results = {}
    try {
      request.body.userStatus = 'Active'
      let checkEmailExist = await userMgmtDAL.emailExist(request)
      if(!checkEmailExist) { 
        // console.log('!checkEmailExist', !checkEmailExist);
        throw new DBError('Data not found')
      } else {
        if(checkEmailExist.recCount> 0) {
          let saltRounds = 10;
          let generatePIN =  Math.floor(1000 + Math.random()*9000)
          request.body.activationPIN = await bcrypt.hash(generatePIN.toString(), saltRounds);
          //request.body.userStatus =  'Inactive'
          let userSave = await userMgmtDAL.updateUser(request)
          if(userSave) {
            const mailOptions = {
              from: process.env.MAILER_SENDERADD, // sender address
              to: request.body.userEmail, // list of receivers
              subject: 'Your Forgot password Reset PIN', // Subject line
              html: '<p>New password activation PIN '+ generatePIN +'</p>'// plain text body
            };
            const mailer = await mailHelper.sendMailer(mailOptions)
            if(mailer) {
              results = {
                code: 200,
                data: checkEmailExist,
                recCount: 1
              }
              return results;
            } else {
              throw new DBError('Mail not sent')
            } 
          }
          } else {
          results = {
            code: 401,
            message: "Email ID does not exist",
            recCount: checkEmailExist.recCount
          }
          // console.log('checkEmailExist 0', results);
          return results;
        }
      }
  }
    catch (error) {
      // console.log(error)
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
        subject: 'Password Reset Sucessfully', // 'Subject of your email', // Subject line
        html: '<p>Password Reset Sucessfully</p>'// '<p>Your html here</p>'// plain text body
      };
      const mailer = await mailHelper.sendMailer(mailOptions)
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
    // console.log(error)
    throw error
  }
}


// Function is used to get particular user detail
async function emailExist (request) {
  try {
    request.body.userStatus = 'Active'
    var results = await userMgmtDAL.emailExist(request)
    // console.log('emailExist - service', results);
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
    // console.log(error)
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
        let activationPIN = request.body.activationPIN 
        
        // console.log('results.user[0].activationPIN', results.user[0].activationPIN, request.body.activationPIN, activationPIN);
      
        const comparePIN = await bcrypt.compare(activationPIN.toString(), results.user[0].activationPIN);
        // console.log('comparePIN', comparePIN);
        if(comparePIN) {
          request.body = {
            activationPIN: '',
            userStatus: 'Active',
            updatedBy: 1,
            password: results.user[0].password,
            userEmail: request.body.userEmail
          }
          // console.log('request', request.body)
          await userMgmtDAL.updateUser(request);
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
    // console.log(error)
    throw error
  }
}

async function fetchAddress(request) {
  try {
    let userID =  await commonHelper.userID(request)
    if(userID) {
     request.body.userID = userID;
    }
    console.log('request.body.userID', request.body.userID);
    var results = await userMgmtDAL.fetchAddress(request)
    if(results) {
      if(results.recCount > 0) {
        return results
      } else {
        return { recCount: 0 }
      }
    } else {
      throw new DBError('Data not found')
    }
  }
  catch (error) {
    throw error
  }
}

async function saveAddressBookDetail(request) {
  try {
    let userID =  await commonHelper.userID(request)
    if(userID) {
     request.body.userID = userID;
    }
    console.log('request.body.userID', request.body.userID);
    var results = await userMgmtDAL.saveAddressBookDetail(request)
    if(results) {
      if(results.recCount > 0) {
        return results
      } else {
        return { recCount: 0 }
      }
    } else {
      throw new DBError('Data not found')
    }
  }
  catch (error) {
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
  verfiyPIN:verfiyPIN,
  fetchAddress: fetchAddress,
  saveAddressBookDetail: saveAddressBookDetail
}
