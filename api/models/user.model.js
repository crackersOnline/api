const sql = require('./db.js');

const getAll = (result) => {
    console.log('test getAll model')
    sql.query("select * from users", (err, res) => {
        if(err){
            console.log("error:", err);
            result(null, err);
            return;
        }
        if(res.length) {
            console.log("found users:", res);
            result(null, res)
        }
    })
}

const createUser = (userData, result) => {
    let query = "INSERT INTO crackersdb.users SET ?"+ userData;
    console.log("createUser ", query);
    sql.query("INSERT INTO crackersdb.users SET ?", userData, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          console.log("created customer: ", { id: res.insertId, ...userData });
          result(null, { id: res.insertId, ...userData });
    })
}

const getByUserID = (userID, result) => {
    sql.query("SELECT * FROM crackersdb.users where userID="+userID, (err, res)=>{
        if(err) {
            console.log("error:", err);
            result(null, err);
            return;
        }
        if(res.length) {
            console.log("found specific users:", res);
            result(null, res)
        }
    })
}
const deleteAllUser = (result) => {
    console.log("Delete all data");
}

const updatePwd = (data, result) => {
    let query = "UPDATE crackersdb.users SET password ='"+data.password+"' WHERE userEmail='"+data.userEmail+"'";
    sql.query(query, (err, res) => {
        if(err) {
            console.log("error:", err);
            result(null, err);
            return;
        }
        console.log("found specific users:", res);
        res.message = 'Password reset Successfully'
        result(null, res);
    })
}

const emailExist = (req, result) => {
    console.log('req.body',req.body);
    let query = "SELECT * from crackersdb.users WHERE userEmail='"+req.body.email+"'";
    sql.query(query, (err, res) => {
        if(err) {
            result(null, err)
            return;
        }
        result(null, res);
    })
}

module.exports = {
    getAll : getAll,
    createUser : createUser,
    getByUserID : getByUserID,
    resetPwd: updatePwd,
    emailExist: emailExist
}