
var nodemailer = require('nodemailer');

var transporter =  nodemailer.createTransport({
  service: process.env.MAILER_SERVICE,
  auth: {
    user: process.env.MAILER_USERNAME,
    pass: process.env.MAILER_PASSWORD
  }
})


 
const resetPwdMailer = (req, result) => {
   transporter.sendMail(req, function(err, info){
     if(err){
       console.log('err', err);
       result(null, err);
       return;
     } else {
       console.log('info', info);
       result(null, info)
     }

   })
}

module.exports = {
  resetPwdMailer: resetPwdMailer
}