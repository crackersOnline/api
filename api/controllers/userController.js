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
    try {
        console.log('req.body',req.body);
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
        const generatedPIN = await bcrypt.hash('"'+ generatePIN +'"', saltRounds);

        // Create a Customer
    const customer = {
        userEmail: req.body.userEmail,
        password: encryptPassword,
        userStatus: 'Inactive', 
        activationPIN: generatedPIN,
    /*  FirstName: "Mathar1",
        MiddleName: "",
        LastName: "Beevi1",
        UserEmail: "laila.mathar1@gmail.com",
        UserStatus: "Active",
        CreatedBy: 1,
        CreatedOn: "2020-04-12T18:30:00.000Z",
        UserRole: "1" */
    };

    userModel.createUser(customer, async (err, data) => {
        if (err) {
        res.status(500).send({
            code: 500,
            message: 
            err.message || 'Some error occurred while creating the Customer'
        });
        } else {
        let generatePIN = Math.floor(1000 + Math.random()*9000);
        const mailOptions = {
            from: process.env.MAILER_SENDERADD, // sender address
            to: req.body.userEmail, // list of receivers
            subject: 'Registration activation PIN', // 'Subject of your email', // Subject line
            html: '<p> Your generated PIN '+ generatePIN + '</p>'// '<p>Your html here</p>'// plain text body
          };
          
        await helper.sendMailer(mailOptions)
        .then(async(result) => {
            
            res.status(200).send({
                code: 200,
                data: data
            });
        })
        .catch((error) => {
            throw error;
        })
       
        }
    })
    } catch(e) {
        console.log('final catch', e);
        throw error;
    }
}


const sendMail = (mailOptions) => {
    
      
        helper.sendMailer(mailOptions, (err, data) => {
            if (err) {
            /* res.status(500).send({
                code: 500,
                message: 
                err.message || 'Some error occurred while sending Mail'
            }); */
            console.log('err in userCOntroller', err);
            return err;
          } else { 
              console.log('mail return', data);
            return data;
           /*  res.status(200).send({
                code: 200,
                data: data
            }); */
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

  
    helper.sendMailer(mailOptions, (err, data) => {
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

 const resetPwd = async(req, res, next) => {
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

const emailExist = async(req, res, next) => {
    if(!req.body) {
        res.status(400).send({
            code: 400,
            message: "Content cannot be empty."
        })
    }
    userModel.emailExist(req, (err, data) => {
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

const verfiyPIN = async(req, res, next) => {
    if(!req.body) {
        res.status(400).send({
            code: 400,
            message: "Content cannot be empty."
        })
    }
    
  var activationPIN = req.body.activationPIN;
  userModel.emailExist(req.body, async (err, data) => {
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
        const comparePIN = await bcrypt.compare(activationPIN, data[0].activationPIN);
        await userModel.updateStatus(req.body);
        if(comparePIN) {
          var result = {
            code: 200,
            status: 'sucess'
          }
          res.status(200).send(result);
        } else {
          res.status(409).send({
            code:409,
            message: "PIN number does not match"
          })
        }
      }
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
    resetPwd: resetPwd,
    emailExist: emailExist,
    verfiyPIN: verfiyPIN
}