'use strict'
require('dotenv').config()
const mysql = require('mysql')
const ConnError = require('../common/exception/connException')

function createPool () {
    console.log('Inside local')
    return new Promise(function (resolve, reject) {
        const pool = mysql.createPool({
            host: process.env.DB_ENDPOINT,
            user: process.env.DB_USERNAME,
            password:process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            waitForConnections: true,
            connectionLimit: process.env.DB_POOL_SIZE,
            queueLimit: 0
        });
        pool.getConnection((err, connection) => {
            if (err) {
              if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                reject(new ConnError('Database connection was closed.'))
              } else if (err.code === 'ER_CON_COUNT_ERROR') {
                reject(new ConnError('Database has too many connections.'))
              } else if (err.code === 'ECONNREFUSED') {
                reject(new ConnError('Database connection was refused.'))
              } else {
                reject(new ConnError(err))
              }
            }
            if (connection) connection.destroy()
            resolve(pool)
          })
    })
  }
  
module.exports = { createPool };