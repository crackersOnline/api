'use strict'

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


module.exports = {
}
