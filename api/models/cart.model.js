const sql = require('./db.js')

const saveCartSession = (req, result) => {
    var dbQuery = "select productID, product.categoryID as categoryID, categoryName, productName, productMRP, productPrice, productDescription, Product.status as productStatus, 0 as count from product inner join category on Category.categoryID=product.categoryID AND Category.status =1 where Product.status = 1 ORDER BY Category.categoryID ASC"
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