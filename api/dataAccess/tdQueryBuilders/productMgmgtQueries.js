'use strict'

const getList = (req) => {
  const data = req.map(item => item.productID).join(',');
  console.log('data', data);
  return data;
}

// This function returns query to get all the demos based on programId for a given date from teradata
const buildFetchProductsQuery = (req) => {
  var query = "SELECT productID, product.categoryID as categoryID, categoryName, productName, productMRP, productPrice, productDescription, Product.status as productStatus, 0 as productQuantity, noOfItems, customerPercentage, productImage from product inner join category on Category.categoryID=product.categoryID AND Category.status =1 where Product.status = 1 ORDER BY Category.categoryID ASC"
 // var query = "SELECT * from crackersdb.order"; 
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
    query += 'INSERT INTO crackersdb.cart(userID, productID, productName, categoryID, categoryName, productPrice, productQty, productImage, createdOn) VALUES '
    query += ' ( '
    query += "'" + req.body.userID + "',"
    query += "'" + req.body.productID + "',"
    query += "'" + req.body.productName + "',"
    query += "'" + req.body.categoryID + "',"
    query += "'" + req.body.categoryName + "',"
    query += "'" + req.body.productPrice + "',"
    query += "'" + req.body.productQuantity + "',"
    query += "'" + req.body.productImage + "',"
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
    query += (req.body.productImage) ? 'productImage = ' + "'" + req.body.productImage + "'," :''
    query += 'updatedOn =  ' + "now() "
    query += ' WHERE userID =' + "'" + req.body.userID + "' AND productID ='" + req.body.productID + "' AND userOrderStatus = '0'"
    return query
  } else if(userAction === 'DELETE') {
    query += 'DELETE FROM crackersdb.cart '
    query += ' WHERE userID =' + "'" + req.body.userID + "' AND productID = " + req.body.productID + " AND userOrderStatus = '0'"
    return query
  } else {
    req.body.productID = getList(req.body.orderProducts)
    query += 'DELETE FROM crackersdb.cart '
    query += ' WHERE userID =' + "'" + req.body.userID + "' AND productID IN (" + req.body.productID + ") AND userOrderStatus = '0'"
    return query
  }
}


// This function returns query to get all the demos based on programId for a given date from teradata
const buildFetchCartDataQuery = (req) => {
  var query = "SELECT c.productID, c.productName, c.categoryID, c.categoryName, c.productQty as productQuantity, p.productPrice, p.productMRP,  (c.productQty * p.productPrice) as productTtlQtyPrice, p.productImage "
  query += " FROM crackersdb.cart as c INNER JOIN crackersdb.product as p on p.productID=c.productID "
  query += "WHERE userID = '"+ req.body.userID +"' AND userOrderStatus='0' "
  return query
}

const buildFetchCouponQuery = (req) => {
  var query = "SELECT couponID, couponCode, couponValue, validOn FROM crackersdb.coupon "
  query += "WHERE couponCode = '"+req.body.couponCode+"' " 
  // query += "AND validOn > now()"
  return query;
}


// This function is used to insert/update the users
const buildSaveOrderQuery = (req, userAction) => {
  console.log('buildSaveOrderQuery - req.body.productID', req.body.orderProducts);
  var query = ''
  if (userAction === 'INSERT') {
    query += 'INSERT INTO crackersdb.order(orderRefID, orderProducts, orderDate, orderStatus, paymentMethod, paymentStatus, deliveryAddress, userID, cartAmount, couponApplied, orderDiscount, orderAmount, updatedOn) VALUES '
    query += ' ( '
    query += "'" + req.body.orderRefID + "',"
    query += "'" + JSON.stringify(req.body.orderProducts) + "',"
    query += "CURDATE(),"
    query += "'" + req.body.orderStatus + "',"
    query += "'" + req.body.paymentMethod + "',"
    query += "'" + req.body.paymentStatus + "',"
    query += "'" + req.body.deliveryAddress + "',"
    query += "'" + req.body.userID + "',"
    query += "'" + req.body.cartAmount + "',"
    query += "'" + req.body.couponApplied + "',"
    query += "'" + req.body.orderDiscount + "',"
    query += "'" + req.body.orderAmount + "',"
    query += "now()"
    query += ' )'
    return query
  }
}

const fetchUserEmailIDByUserIDQuery = (req) => {
  var query = 'SELECT userEmail FROM crackersdb.users WHERE userID = ' + req;
  return query;
}

module.exports = {
  buildFetchProductsQuery: buildFetchProductsQuery,
  buildFetchCategoriesQuery: buildFetchCategoriesQuery,
  buildProductSaveQuery: buildProductSaveQuery,
  buildfetchCartItemByUserQuery: buildfetchCartItemByUserQuery,
  buildTempCartSaveQuery: buildTempCartSaveQuery,
  buildFetchCartDataQuery: buildFetchCartDataQuery,
  buildFetchCouponQuery: buildFetchCouponQuery,
  buildSaveOrderQuery: buildSaveOrderQuery,
  fetchUserEmailIDByUserIDQuery: fetchUserEmailIDByUserIDQuery
}
