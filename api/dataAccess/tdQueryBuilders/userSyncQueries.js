'use strict'
var moment = require('moment-timezone');

// Fetch usersso from workgroup db
const buildFetchSSOFromPostgredbQuery = (req) => {
  var query = 'SELECT distinct "_users"."name" AS "userSSO" ' +
  'FROM "public"."_sites" "_sites" ' +
  'INNER JOIN "public"."_users" "_users" ON ("_sites"."id" = "_users"."site_id") ' +
  'INNER JOIN "public"."group_users" "group_users" ON ("_users"."id" = "group_users"."user_id") ' +
  'INNER JOIN "public"."groups" "groups" ON ("group_users"."group_id" = "groups"."id") ' +
  'where _sites.name = ' + "'Peacock'"
  // console.log(query)
  return query
}

// Fetch usersso from pavodb db
const buildFetchSSOFromPavodbQuery = (req) => {
  var query = 'SELECT distinct userSSO, userStatus ' +
  'FROM pavodb.Users'
  // console.log(query)
  return query
}

// This function is used to insert/update the users
const buildUserSaveQuery = (req, userAction) => {
  var estDateTime = moment().tz(process.env.EST_TIMEZONE)
  var query = ''
  if (userAction === 'INSERT') {
    query += 'INSERT INTO pavodb.Users(UserSSO, FirstName, LastName, UserEmail, UserStatus, CreatedBy, CreatedOn, UpdatedBy, UpdatedOn, UserRole, UserCategories, UserModules, SubBusinessID, CostCentreID) VALUES '
    query += ' ( '
    query += "'" + req.UserSSO + "',"
    query += "'" + replace(req.FirstName) + "',"
    query += "'" + replace(req.LastName) + "',"
    query +="'" + replace(req.UserEmail) + "',"
    query += "'" + req.UserStatus + "',"
    query += "'" + req.CreatedBy + "',"
    query += "'" + estDateTime.format() + "',"
    query += "'" + req.CreatedBy + "',"
    query += "'" + estDateTime.format() + "',"
    query += "'" + req.UserRole + "',"
    query += "'" + JSON.stringify(req.UserCategories) + "',"
    query += "'" + JSON.stringify(req.UserModules) + "',"
    query +=  req.SubBusinessID + ", "
    query +=  req.CostCentreID 
    query += ' )'
  } else {
    query += 'UPDATE pavodb.Users '
    query += 'SET '
    query += 'UserEmail = ' + "'" + replace(req.UserEmail) + "'," 
    query += 'FirstName = ' + "'" + replace(req.FirstName) + "'," 
    query += 'LastName = ' + "'" + replace(req.LastName) + "',"
    query += 'UpdatedBy = ' + "'" + req.CreatedBy + "',"
    query += 'UserStatus = ' + "'" + req.UserStatus + "',"
    query += 'UpdatedOn =  ' + "'" + estDateTime.format() + "',"
    query += 'UserRole = ' + "'" + req.UserRole + "', "
    query += 'UserCategories = ' + "'" + JSON.stringify(req.UserCategories) + "', "
    query += 'UserModules = ' + "'" + JSON.stringify(req.UserModules) + "', "
    query += 'SubBusinessID = ' + req.SubBusinessID + ", "
    query += 'CostCentreID = ' + req.CostCentreID + " " 
    query += ' WHERE UserSSO =' + "'" + req.UserSSO + "'"
  }
  // console.log(query)
  return query
}

// update userstatus to users table
const buildUpdateUnwantedSSOFromPavoUser = (req) => {
  // // console.log('Delete req', req);
  var query = "UPDATE pavodb.Users SET UserStatus = 'Inactive' WHERE UserSSO IN (" + req.toString() + ")"
  // console.log(query)
  return query
}

// replace single quotes to backslash 
const replace = (data) => {
  let replaceData
  replaceData = data.replace(/'/g, "\\'")
  return replaceData
}

// Fetch category from categoryMaster table
const buldFetchCategoryListFromMaster = () => {
  var query = "SELECT CatgID FROM pavodb.CategoryMaster WHERE IsSecure = 'N'"
  // console.log(query)
  return query
}

// Fetch particular costcentreID from costcentre Master Table
const buildFetchCostCenterIDFromMaster = (costcentreDesc) => {
  var query = "SELECT CostCentreID, CostCentreDesc FROM pavodb.CostCentreMaster WHERE CostCentreCode='" + costcentreDesc + "'"
  // console.log(query)
  return query
}

// Fetch particular SubBusinessID from SubBusinessMaster Table
const buildFetchSubBusinessIDFromMaster = (req) => {
  let orgsegmentWhereQuery = ''
  if (req.custom_orgsegment || req.custom_suborgsegment) {
    if (req.custom_orgsegment && !req.custom_suborgsegment) {
      orgsegmentWhereQuery = "SubBusinessDesc = '" + req.custom_orgsegment + "'"
    } else if (!req.custom_orgsegment && req.custom_suborgsegment) {
      orgsegmentWhereQuery = "SubBusinessDesc = '" + req.custom_suborgsegment + "'"
    } else if (req.custom_orgsegment && req.custom_suborgsegment) {
      orgsegmentWhereQuery = "SubBusinessDesc = '" + req.custom_orgsegment + "' || SubBusinessDesc = '" + req.custom_suborgsegment + "'"
    }
  }
  var query = "SELECT SubBusinessID, SubBusinessDesc FROM pavodb.SubBusinessMaster WHERE (" + orgsegmentWhereQuery +") "
  // console.log(query)
  return query
}

// Insert record to SubBusinessMaster table
const buildInsertSubBusinessFromMaster = (subBusinessDesc) => {
  var estDateTime = moment().tz(process.env.EST_TIMEZONE)

  let description = (subBusinessDesc.custom_orgsegment) ? subBusinessDesc.custom_orgsegment : subBusinessDesc.custom_suborgsegment
  var query = "INSERT INTO pavodb.SubBusinessMaster(SubBusinessDesc, CreatedBy, CreatedOn, UpdatedBy, UpdatedOn) VALUES"
  query += ' ( '
  query += "'" + description + "',"
  query += "'" + process.env.IAM_USERNAME + "',"
  query += "'" + estDateTime.format() + "',"
  query += "'" + process.env.IAM_USERNAME + "',"
  query += "'" + estDateTime.format() + "'"
  query += ' ) '
  // console.log('buildInsertSubBusinessFromMaster ---  ', query)
  return query
}

// Insert record to SubBusinessMaster table
const buildInsertCostCentreFromMaster = (CostCentreDesc) => {
  var estDateTime = moment().tz(process.env.EST_TIMEZONE)

  var query = "INSERT INTO pavodb.CostCentreMaster(CostCentreDesc, CreatedBy, CreatedOn, UpdatedBy, UpdatedOn, CostCentreCode) VALUES"
  query += ' ( '
  query += "'" + CostCentreDesc + "',"
  query += "'" + process.env.IAM_USERNAME + "',"
  query += "'" + estDateTime.format() + "',"
  query += "'" + process.env.IAM_USERNAME + "',"
  query += "'" + estDateTime.format() + "',"
  query += "'" + CostCentreDesc + "'"
  query += ' ) '
  // console.log('buildInsertCostCentreFromMaster ---  ', query)
  return query
}

module.exports = {
  buildFetchSSOFromPostgredbQuery,
  buildFetchSSOFromPavodbQuery,
  buildUserSaveQuery,
  buildUpdateUnwantedSSOFromPavoUser,
  buldFetchCategoryListFromMaster,
  buildFetchCostCenterIDFromMaster,
  buildFetchSubBusinessIDFromMaster,
  buildInsertSubBusinessFromMaster,
  buildInsertCostCentreFromMaster
}
