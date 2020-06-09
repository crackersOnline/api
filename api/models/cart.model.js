const sql = require('./db.js')
const commonHelper = require('./../helpers/common-helper.js')

const saveCartSession = (req, result) => {

 let userID =  commonHelper.userID(req);
  console.log('req', userID);
  
    var dbQuery = "INSERT"
    console.log("getProducts",dbQuery);
    sql.query(dbQuery, (err, res) => {
        if(err){
            console.log("error:", err)
            result(null, err);
            return;
        }
        if(res.length) {
            console.log("found Product:", res)
            result(null, res)
        }
    })
}

module.exports = {
  saveCartSession : saveCartSession
}