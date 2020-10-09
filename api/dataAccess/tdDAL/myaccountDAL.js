'use strict'
const buildQuery = require('../tdQueryBuilders/myaccountQueries')
const DBError = require('../../../common/exception/dbException')
const db = require('../../../config/db')


function fetchUserOrdersByUserID (request) {
    return new Promise(function (resolve, reject) {
      db.createPool()
        .then(pool => {
          var dbQuery = buildQuery.buildfetchUserOrdersByUserIDQuery(request)
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
  
function fetchDeliveryAddressByID (request) {
  return new Promise(function (resolve, reject) {
    db.createPool()
      .then(pool => {
        var dbQuery = buildQuery.buildfetchDeliveryAddressByIDQuery(request)
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
    fetchUserOrdersByUserID: fetchUserOrdersByUserID,
    fetchDeliveryAddressByID: fetchDeliveryAddressByID
  }
  