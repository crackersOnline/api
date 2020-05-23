const sql = require('./db.js');

const getProducts = (result) => {
    console.log('test getProducts model')
    sql.query("select * from Product", (err, res) => {
        if(err){
            console.log("error:", err);
            result(null, err);
            return;
        }
        if(res.length) {
            console.log("found Product:", res);
            result(null, res)
        }
    })
}
module.exports = {
    getProducts : getProducts
}