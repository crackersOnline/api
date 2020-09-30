
var nodemailer = require('nodemailer');

var transporter =  nodemailer.createTransport({
  service: process.env.MAILER_SERVICE,
  auth: {
    user: process.env.MAILER_USERNAME,
    pass:  process.env.MAILER_PASSWORD
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

module.exports = {
  sendMailer: sendMailer
}