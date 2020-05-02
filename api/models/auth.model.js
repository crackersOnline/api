const sql = require('./db.js');
const bcrypt = require('bcrypt');


const loginUser = (userData, result) => {
    let query = "SELECT * FROM users WHERE username = '" + userData.username + "' and password ='" + userData.password + "'"
    sql.query(query, (err, res) => {
        if(err) {
            console.log("error:", err);
            result(null, err);
            return;
        }
        if(res.length >= 0) {
            console.log('found users:', res);
            result(null, res)
        }
    });
}

module.exports = {
    loginUser: loginUser
}