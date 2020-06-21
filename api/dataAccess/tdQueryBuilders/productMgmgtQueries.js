'use strict'

// This function returns query to get all the demos based on programId for a given date from teradata
const buildFetchProductsQuery = (req) => {
  var query = "SELECT productID, product.categoryID as categoryID, categoryName, productName, productMRP, productPrice, productDescription, Product.status as productStatus, 0 as productQuantity from product inner join category on Category.categoryID=product.categoryID AND Category.status =1 where Product.status = 1 ORDER BY Category.categoryID ASC"
  return query
}

// This function returns query to get all the demos based on programId for a given date from teradata
const buildFetchCategoriesQuery = (req) => {
  var query = "SELECT categoryID, categoryName FROM crackersdb.Category where status=1"
  return query
}

// This function is used to insert/update the users
const buildProductSaveQuery = (req, userAction) => {
  var query = ''
  if (userAction === 'INSERT') {
    query += 'INSERT INTO pavodb.DashboardReportMaster(DashboardReportID, DashboardReportName, ReportType, ReportLink, CreatedBy, CreatedOn, UpdatedBy, UpdatedOn, UserRole) VALUES '
    query += ' ( '
    query += "'" + req.body.DashboardReportID + "',"
    query += "'" + req.body.DashboardReportName + "',"
    query += "'" + req.body.ReportType + "',"
    query += "'" + req.body.ReportLink + "',"
    query += "'206428436', sysdate(), '206428436', sysdate()"
    query += ' )'
    return query
  } else {
    query += 'UPDATE pavodb.DashboardReportMaster '
    query += 'SET DashboardReportName = ' + "'" + req.body.DashboardReportName + "',"
    query += 'ReportType = ' + "'" + req.body.ReportType + "',"
    query += 'ReportLink = ' + "'" + req.body.ReportLink + "',"
    query += "UpdatedBy ='206428436',"
    query += 'UpdatedOn = sysdate()'
    query += ' WHERE DashboardReportID =' + "'" + req.body.DashboardReportID + "'"
    return query
  }
}


// This function returns query to get all the demos based on programId for a given date from teradata
const buildfetchCartItemByUserQuery = (req) => {
  var query = "SELECT cartID FROM crackersdb.cart where productID= '" + req.body.productID + "' AND userID = '"+ req.body.userID +"' AND userOrderStatus='0' "
  return query
}


// This function is used to insert/update the users
const buildTempCartSaveQuery = (req, userAction) => {
  var query = ''
  if (userAction === 'INSERT') {
    query += 'INSERT INTO crackersdb.cart(userID, productID, productName, categoryID, categoryName, productPrice, productQty, createdOn) VALUES '
    query += ' ( '
    query += "'" + req.body.userID + "',"
    query += "'" + req.body.productID + "',"
    query += "'" + req.body.productName + "',"
    query += "'" + req.body.categoryID + "',"
    query += "'" + req.body.categoryName + "',"
    query += "'" + req.body.productPrice + "',"
    query += "'" + req.body.productQuantity + "',"
    query += "now()"
    query += ' )'
    return query
  } else if (userAction === 'UPDATE') {
    query += 'UPDATE crackersdb.cart '
    query += 'SET '
    query += 'userID = ' + "'" + req.body.userID + "'," 
    query += (req.body.productID ) ?  'productID = ' + "'" + req.body.productID + "'," : ''
    query += (req.body.productName) ?  'productName = ' + "'" + req.body.productName + "'," : ''
    query += (req.body.categoryID)?  'categoryID = ' + "'" + req.body.categoryID + "'," : ''
    query += (req.body.categoryName) ? 'categoryName = ' + "'" + req.body.categoryName + "'," :''
    query += (req.body.productPrice)?  'productPrice = ' + "'" + req.body.productPrice + "'," : ''
    query += (req.body.productQuantity) ? 'productQty = ' + "'" + req.body.productQuantity + "'," :''
    query += 'updatedOn =  ' + "now() "
    query += ' WHERE userID =' + "'" + req.body.userID + "' AND productID ='" + req.body.productID + "' AND userOrderStatus = '0'"
    return query
  } else {
    query += 'DELETE FROM crackersdb.cart '
    query += ' WHERE userID =' + "'" + req.body.userID + "' AND productID ='" + req.body.productID + "' AND userOrderStatus = '0'"
    return query
  }
}


// This function returns query to get all the demos based on programId for a given date from teradata
const buildFetchCartDataQuery = (req) => {
  console.log('req.body.productID', req.body);
  var query = "SELECT c.productID, c.productName, c.categoryID, c.categoryName, c.productQty as productQuantity, p.productPrice, p.productMRP,  (c.productQty * p.productPrice) as productTtlQtyPrice "
  query += " FROM crackersdb.cart as c INNER JOIN crackersdb.product as p on p.productID=c.productID "
  query += "WHERE userID = '"+ req.body.userID +"' AND userOrderStatus='0' "
  return query
}


module.exports = {
  buildFetchProductsQuery: buildFetchProductsQuery,
  buildFetchCategoriesQuery: buildFetchCategoriesQuery,
  buildProductSaveQuery: buildProductSaveQuery,
  buildfetchCartItemByUserQuery: buildfetchCartItemByUserQuery,
  buildTempCartSaveQuery: buildTempCartSaveQuery,
  buildFetchCartDataQuery: buildFetchCartDataQuery
}
