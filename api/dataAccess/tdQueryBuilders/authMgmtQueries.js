'use strict'

// This function returns query to get all the demos based on programId for a given date from teradata
const buildfetchUserByColumnQuery = (req, type) => {
  let whereQuery = '';
  if(type === "userEmail") {
    whereQuery = "userEmail = '" + req.body.userEmail + "'"
  } else if(type === "userID") {
    whereQuery = "userID = '" + req.body.userID + "'"
  }
  let query = "SELECT userID, userName, userMobile, userAddress, userCity, userState, userPincode, userEmail, userStatus, userRole, password FROM crackersdb.users WHERE " + whereQuery;
  return query
}

// This function is used to insert/update the users
const buildDashboardSaveQuery = (req, userAction) => {
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

module.exports = {
  buildfetchUserByColumnQuery: buildfetchUserByColumnQuery,
  buildDashboardSaveQuery: buildDashboardSaveQuery
}
