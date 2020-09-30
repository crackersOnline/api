'use strict'
var moment = require('moment-timezone');

// This function returns query to get all the demos based on programId for a given date from teradata
const buildfetchUserQuery = (req) => {
  var query = 'SELECT * FROM crackersdb.users'
  return query
}

// This function is used to insert/update the users
const buildUserSaveQuery = (req, userAction) => {
  var query = ''
  if (userAction === 'INSERT') {
    query += 'INSERT INTO crackersdb.users( userEmail,password, activationPIN, userStatus, createdBy, createdOn, updatedBy, updatedOn) VALUES '
    query += ' ( '
    query +="'" + replace(req.body.userEmail) + "',"
    query += "'" + req.body.password + "',"
    query += "'" + req.body.activationPIN + "',"
    query += "'" + req.body.userStatus + "',"
    query += "'" + req.body.createdBy + "',"
    query += "now(),"
    query += "'" + req.body.createdBy + "',"
    query += "now() "
    query += ' )'
    return query
  } else {
    query += 'UPDATE crackersdb.users '
    query += 'SET '
    query += 'userEmail = ' + "'" + replace(req.body.userEmail) + "'," 
    query += (req.body.password ) ?  'password = ' + "'" + req.body.password + "'," : ''
    query += (req.body.activationPIN) ?  'activationPIN = ' + "'" + req.body.activationPIN + "'," : ''
    query += (req.body.updatedBy)?  'updatedBy = ' + "'" + req.body.updatedBy + "'," : 'updatedBy = 1, '
    query += (req.body.userStatus) ? 'userStatus = ' + "'" + req.body.userStatus + "'," :''
    query += 'updatedOn =  ' + "now() "
    query += ' WHERE userEmail =' + "'" + req.body.userEmail + "'"
    return query
  }
}

// replace single quotes to backslash 
const replace = (data) => {
  let replaceData;
  replaceData = data.replace(/'/g, "\\'");
  return replaceData;
}

// This function is used to update the user status 
const buildUserStatusUpdateQuery = (req) => {
//  var dateTime = moment().tz(process.env.TIMEZONE);
  var query = 'UPDATE crackersdb.users '
  query += 'SET userStatus = "' + req.body.userStatus + ' ", '
// query += 'updatedOn =  ' + "'" + dateTime.format() + "' "
  query += 'updatedOn =  ' + "now() "
  query += 'WHERE userID =' + "'" + req.body.userID + "'"
  return query
}


// This function is used to get particular user details
const buildfetchUserByUserIDQuery = (req) => {
  var query = " SELECT * FROM crackersdb.users "
  query += "WHERE userID="+"'" + req.body.userID + "'"
  return query;
}

const buildfetchEmailFromUsers = (req) => {
 /* let  whereClause = '';
   if(column === 'userEmail') {
    whereClause = ' AND '+column +' = "'+ req.body.userEmail +'"' 
  } */
  var query = "SELECT * FROM crackersdb.users "
  query += "WHERE userStatus= '"+ req.body.userStatus +"' AND userEmail='"+ req.body.userEmail +"' "
  return query;
}

const buildFetcAddressQuery = (req) => {
  var query = "SELECT * FROM crackersdb.addressbook "
  query += "WHERE userID= '" + req.body.userID +"' AND status='1'";
  return query;
}


// This function is used to insert/update the users
const buildAddressBookSaveQuery = (req) => {
  var query = ''
  if (req.body.type === 'INSERT') {
    query += 'INSERT INTO crackersdb.addressbook( userID,addressType, flatNo, address, landmark, city, state, pincode, mobile, createdOn, updatedOn) VALUES '
    query += ' ( '
    query +="'" + req.body.userID + "',"
    query += "'" + req.body.addressType + "',"
    query += "'" + req.body.flatNo + "',"
    query += "'" + req.body.address + "',"
    query += "'" + req.body.landmark + "',"
    query += "'" + req.body.city + "',"
    query += "'" + req.body.state + "',"
    query += "'" + req.body.pincode + "',"
    query += "'" + req.body.mobile + "',"
    query += "now(),"
    query += "now() "
    query += ' )'
    return query
  } else {
    query += 'UPDATE crackersdb.addressbook '
    query += 'SET '
    query += 'userID = ' + "'" + req.body.userID + "'," 
    query += (req.body.addressType ) ?  'addressType = ' + "'" + req.body.addressType + "'," : ''
    query += (req.body.flatNo) ?  'flatNo = ' + "'" + req.body.flatNo + "'," : ''
    query += (req.body.address)?  'address = ' + "'" + req.body.address + "'," : ''
    query += (req.body.landmark) ? 'landmark = ' + "'" + req.body.landmark + "'," :''
    query += (req.body.city ) ?  'city = ' + "'" + req.body.city + "'," : ''
    query += (req.body.state) ?  'state = ' + "'" + req.body.state + "'," : ''
    query += (req.body.pincode)?  'pincode = ' + "'" + req.body.pincode + "'," : ''
    query += (req.body.mobile) ? 'mobile = ' + "'" + req.body.mobile + "'," :''
    query += (req.body.status) ? 'status = ' + "'" + req.body.status + "'," :''
    query += 'updatedOn =  ' + "now() "
    query += ' WHERE userID = "' + req.body.userID + '" AND addressID = "'+ req.body.addressID + '"'
    return query
  }
}

module.exports = {
  buildfetchUserQuery: buildfetchUserQuery,
  buildUserSaveQuery: buildUserSaveQuery,
  buildUserStatusUpdateQuery: buildUserStatusUpdateQuery,
  buildfetchUserByUserIDQuery: buildfetchUserByUserIDQuery,
  buildfetchEmailFromUsers: buildfetchEmailFromUsers,
  buildFetcAddressQuery: buildFetcAddressQuery,
  buildAddressBookSaveQuery: buildAddressBookSaveQuery
}
