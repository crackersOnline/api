const sql = require('./db.js');


const loginUser = (userData, result) => {
    let query = "SELECT * FROM crackersdb.users WHERE userEmail = '" + userData.userEmail + "'";
    console.log('loginuser query', query);
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