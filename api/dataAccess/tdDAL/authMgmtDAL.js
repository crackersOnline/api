'use strict'
const buildQuery = require('../tdQueryBuilders/authMgmtQueries')
const DBError = require('../../../common/exception/dbException')
const db = require('../../../config/db')

function fetchUserByEmailID (request) {
  return new Promise(function (resolve, reject) {
    db.createPool()
      .then(pool => {
        var dbQuery = buildQuery.buildfetchUserByColumnQuery(request, 'userEmail')
        // console.log(dbQuery)
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
        // console.log('create pool error')
        reject(error)
      })
  })
}

function fetchUserByUserID (request) {
  return new Promise(function (resolve, reject) {
    db.createPool()
      .then(pool => {
        var dbQuery = buildQuery.buildfetchUserByColumnQuery(request, 'userID')
        // console.log(dbQuery)
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
        // console.log('create pool error')
        reject(error)
      })
  })
}


module.exports = {
  fetchUserByEmailID: fetchUserByEmailID,
  fetchUserByUserID:fetchUserByUserID
}
