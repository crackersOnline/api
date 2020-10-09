
var nodemailer = require('nodemailer');
var path = require('path')

var transporter = nodemailer.createTransport({
 /*  service: process.env.MAILER_SERVICE,
  auth: {
    user: process.env.MAILER_USERNAME,
    pass:  process.env.MAILER_PASSWORD
  } */
  service: process.env.MAILER_SERVICE, // 'gmail',//smtp.gmail.com  //in place of service use host...
    secure: process.env.MAILER_SECURE, //  false,//true
    port: process.env.MAILER_PORT, // 25,//465
    auth: {
      user: process.env.MAILER_USERNAME,
      pass:  process.env.MAILER_PASSWORD,
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
  }, 
  juiceResources: {
    preserveImportant: true,
    webResources: {
      relativeTo: path.resolve('build'),
      images: true // <--- set this as `true`
    }
  }*/

});


module.exports = {
  sendMailer: sendMailer,
  mail: mail
}