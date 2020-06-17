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
  console.log('req.body.productID', req.body);
  var query = "SELECT cartID FROM crackersdb.cart where productID= '" + req.body[0].productID + "' AND userID = '"+ req.body.userID +"' "
  return query
}

module.exports = {
  buildFetchProductsQuery: buildFetchProductsQuery,
  buildFetchCategoriesQuery: buildFetchCategoriesQuery,
  buildProductSaveQuery: buildProductSaveQuery,
  buildfetchCartItemByUserQuery: buildfetchCartItemByUserQuery,
}
