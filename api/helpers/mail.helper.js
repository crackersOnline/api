
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
 /*  service: process.env.MAILER_SERVICE,
  auth: {
    user: process.env.MAILER_USERNAME,
    pass:  process.env.MAILER_PASSWORD
  } */
  service: 'gmail',//smtp.gmail.com  //in place of service use host...
    secure: false,//true
    port: 25,//465
    auth: {
      user: 'santusend@gmail.com',
      pass: 'dellbell',
    }, tls: {
      rejectUnauthorized: false
    }
})


 
const sendMailer = (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(err, info){
      if(err){
        reject(err);
      } else {
        resolve(info);
      }
    })
  })
   
}

/*
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: false,
  auth: {
    user: // mailtrap.io username
    pass: // mailtrap.io password
  }
}); */

const Email = require('email-templates');

const mail = new Email({
  transport: transporter,
  send: true,
  preview: false,
  /* views: {
    options: {
      extension: 'pug'
    },
    root: 'emailTemplates/',
  }, */

});


module.exports = {
  sendMailer: sendMailer,
  mail: mail
}