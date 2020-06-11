'use strict'
const buildQuery = require('../tdQueryBuilders/userMgmtQueries')
const DBError = require('../../../common/exception/dbException')
const ConnError = require('../../../common/exception/connException')
const db = require('../../../config/db')

// This function gets all the list of the users
function fetchUsers (request) {
  return new Promise(function (resolve, reject) {
    db.createPool()
      .then(pool => {
        var dbQuery = buildQuery.buildfetchUserQuery(request)
        console.log(dbQuery)
        pool.getConnection((err, connection) => {
          if (err) {
            reject(new DBError(err))
          }
          if (connection) {
            connection.query(dbQuery, function (err, rows, fields) {
              // Connection is automatically released when query resolves
              if (err) {
                reject(new DBError(err))
              } else {
                var results = {
                  recCount: rows.length,
                  users: rows,
                  dbErr: null
                }
                connection.destroy()
                resolve(results)
              }
            })
          }
        })
      })
      .catch(error => {
        console.log('create pool error')
        reject(error)
      })
  })
}

// Function is used to insert the user
function createUser (request) {
  return new Promise(function (resolve, reject) {
    db.createPool()
      .then(pool => {
        var dbQuery = buildQuery.buildUserSaveQuery(request, 'INSERT')
        console.log(dbQuery)
        pool.getConnection((err, connection) => {
          if (err) {
            reject(new DBError(err))
          }
          if (connection) {
            connection.query(dbQuery, function (err, rows, fields) {
              // Connection is automatically released when query resolves
              if (err) {
                reject(new DBError(err))
              } else {
                var results = {
                  userSave: rows,
                  dbErr: null
                }
                connection.destroy()
                resolve(results)
              }
            })
          }
        })
      })
      .catch(error => {
        console.log('create pool error')
        reject(error)
      })
  })
}

// Function is used to insert the user
function updateUser (request) {
  return new Promise(function (resolve, reject) {
    db.createPool()
      .then(pool => {
        var dbQuery = buildQuery.buildUserSaveQuery(request, 'UPDATE')
        console.log(dbQuery)
        pool.getConnection((err, connection) => {
          if (err) {
            reject(new DBError(err))
          }
          if (connection) {
            connection.query(dbQuery, function (err, rows, fields) {
              // Connection is automatically released when query resolves
              if (err) {
                reject(new DBError(err))
              } else {
                var results = {
                  userSave: rows,
                  dbErr: null
                }
                connection.destroy()
                resolve(results)
              }
            })
          }
        })
      })
      .catch(error => {
        console.log('create pool error')
        reject(error)
      })
  })
}

// Function is used to insert the user
function deleteUser (request) {
  return new Promise(function (resolve, reject) {
    db.createPool()
      .then(pool => {
        var dbQuery = buildQuery.buildInactiveQuery(request)
        console.log(dbQuery)
        pool.getConnection((err, connection) => {
          if (err) {
            reject(new DBError(err))
          }
          if (connection) {
            connection.query(dbQuery, function(err, rows, fields) {
              // Connectin is automatically released when query resolves
              if (err) {
                reject(new DBError(err))
              } else {
                var results = {
                  userSave: rows,
                  dbErr: null
                }
                connection.destroy()
                resolve(results)
              }
            })
          }
        })
      })
      .catch(error => {
        console.log("create pool error")
        reject(error)
      })
  })
}

// This function gets the particular user detail
function fetchUserByUserID ( request) {
  return new Promise(function (resolve, reject) {
    db.createPool()
      .then(pool => {
        var dbQuery = buildQuery.buildfetchUserByUserIDQuery(request)
        console.log(dbQuery)
        pool.getConnection((err, connection) => {
          if(err) {
            reject(new DBError(err))
          }
          if (connection) {
            connection.query(dbQuery, function(err, row, fields) {
              // Connection is automatically released when query resolves
              if (err) {
                reject(new DBError(err))
              } else {
                var results = {
                  recCount: row.length,
                  user: row,
                  dbErr: null
                }
                connection.destroy()
                resolve(results)
              }
            })
          }
        })
      }) 
      .catch(error => {
        console.log('create pool error')
        reject(error)
      })
  })
}

// This function gets the particular user detail
function emailExist ( request) {
  return new Promise(function (resolve, reject) {
    db.createPool()
      .then(pool => {
        var dbQuery = buildQuery.buildfetchEmailFromUsers(request)
        console.log(dbQuery)
        pool.getConnection((err, connection) => {
          if(err) {
            reject(new DBError(err))
          }
          if (connection) {
            connection.query(dbQuery, function(err, row, fields) {
              // Connection is automatically released when query resolves
              if (err) {
                reject(new DBError(err))
              } else {
                var results = {
                  recCount: row.length,
                  user: row,
                  dbErr: null
                }
                connection.destroy()
                resolve(results)
              }
            })
          }
        })
      }) 
      .catch(error => {
        console.log('create pool error')
        reject(error)
      })
  })
}


module.exports = {
  fetchUsers: fetchUsers,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  fetchUserByUserID: fetchUserByUserID,
  emailExist: emailExist
}
