const sql = require('./db.js')

const getProducts = (result) => {
    var dbQuery = "select productID, product.categoryID as categoryID, categoryName, productName, productMRP, prouductPrice, productDescription, Product.status as productStatus, 0 as count from product inner join category on Category.categoryID=product.categoryID AND Category.status =1 where Product.status = 1 ORDER BY Category.categoryID ASC"
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
const getcategories = (result) => {
    var dbQuery = "SELECT categoryID, categoryName FROM crackersdb.Category where status=1"
    console.log("getProducts",dbQuery);
    sql.query(dbQuery, (err, res) => {
        if(err){
            console.log("error:", err)
            result(null, err);
            return;
        }
        if(res.length) {
            console.log("found Category:", res)
            result(null, res)
        }
    })
}

module.exports = {
    getProducts : getProducts,
    getcategories : getcategories
}