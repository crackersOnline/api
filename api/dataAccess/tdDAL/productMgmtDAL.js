'use strict'
const buildQuery = require('../tdQueryBuilders/productMgmgtQueries')
const DBError = require('../../../common/exception/dbException')
const ConnError = require('../../../common/exception/connException')
const db = require('../../../config/db')
const lodash = require('lodash')

function getProducts (request) {
  return new Promise(function (resolve, reject) {
    db.createPool()
      .then(pool => {
        var dbQuery = buildQuery.buildFetchProductsQuery(request)
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
                  data: rows,
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


function fetchCategories (request) {
  return new Promise(function (resolve, reject) {
    db.createPool()
      .then(pool => {
        var dbQuery = buildQuery.buildFetchCategoriesQuery(request)
        // console.log('fetchCategories', dbQuery)
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
                  data: rows,
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

function createProduct (request) {
  return new Promise(function (resolve, reject) {
    db.createPool()
      .then(pool => {
        var dbQuery = buildQuery.builProductSaveQuery(request, 'INSERT')
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
        // console.log('create pool error')
        reject(error)
      })
  })
}

// Function is used to insert the user
function updateProduct (request) {
  return new Promise(function (resolve, reject) {
    db.createPool()
      .then(pool => {
        var dbQuery = buildQuery.buildProductSaveQuery(request, 'UPDATE')
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
        // console.log('create pool error')
        reject(error)
      })
  })
}


// Function is used to insert the user
function buildSaveTempCart (request, type) {
  console.log('type', type)
  return new Promise(function (resolve, reject) {
    db.createPool()
      .then(pool => {
        var dbQuery = buildQuery.buildTempCartSaveQuery(request, type)
         console.log('buildSaveTempCart',dbQuery)
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
                  dbErr: null,
                  recCount: rows.affectedRows
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


function fetchCartItemByUser (request) {
  return new Promise(function (resolve, reject) {
    db.createPool()
      .then(pool => {
        var dbQuery = buildQuery.buildfetchCartItemByUserQuery(request)
         console.log('fetchCartItemByUser', dbQuery)
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
                console.log('rows',rows, rows.length);
                var results = {
                  recCount: rows.length,
                  data: rows,
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


function fetchCartData (request) {
  return new Promise(function (resolve, reject) {
    db.createPool()
      .then(pool => {
        var dbQuery = buildQuery.buildFetchCartDataQuery(request)
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
                  data: rows,
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

function fetchCoupon (request) {
  return new Promise(function (resolve, reject) {
    db.createPool()
      .then(pool => {
        var dbQuery = buildQuery.buildFetchCouponQuery(request)
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
                  data: rows,
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

// Function is used to Transaction Queries - insert the orders, remove cart session
function buildSaveOrder (request, type) {
  console.log('type', type)
  return new Promise(function (resolve, reject) {
    db.createPool()
      .then(pool => {
        var db1Query = buildQuery.buildSaveOrderQuery(request, type)
        var db2Query = buildQuery.buildTempCartSaveQuery(request, 'REMOVE')
         console.log('buildSaveOrder db1Query',db1Query)
         console.log('buildSaveOrder db2Query',db2Query)
        pool.getConnection((err, connection) => {
          if (err) {
            console.log('DBError',err)
            reject(new DBError(err))
          }
          if (connection) {
            connection.beginTransaction(function(err) {
              if(err) {
                reject(new DBError(err))
              }
              connection.query(db1Query, function (err, rows, fields) {
                if (err) {
                  connection.rollback(function(){
                    console.log('syntax',err)
                    reject(new DBError(err))
                  })
                } else {
                  var results = {
                    userSave: rows,
                    dbErr: null,
                    recCount: rows.affectedRows
                  }
                  connection.query(db2Query, function (err, rows, fields) {
                    if (err) {
                      connection.rollback(function() {
                        console.log('syntax',err)
                        reject(new DBError(err))
                      })
                    } 
                    connection.commit(function(err) {
                      if(err) {
                        connection.rollback(function() {
                          reject(new DBError(err))
                        })
                      }
                      console.log('Transaction completed')
                      connection.destroy()
                      resolve(results)
                    })

                })
              }
            })
          })
        }
      })
      })
      .catch(error => {
         console.log('create pool error', error)
        reject(error)
      })
  })
}


module.exports = {
  getProducts: getProducts,
  fetchCategories: fetchCategories,
  createProduct: createProduct,
  updateProduct: updateProduct,
  buildSaveTempCart: buildSaveTempCart,
  fetchCartItemByUser: fetchCartItemByUser,
  fetchCartData: fetchCartData,
  fetchCoupon : fetchCoupon,
  buildSaveOrder: buildSaveOrder
}
