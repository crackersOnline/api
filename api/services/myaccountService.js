'use const'

const authMgmtDAL = require('../dataAccess/tdDAL/authMgmtDAL');
const myaccountDAL = require('../dataAccess/tdDAL/myaccountDAL');
const commonHelper = require('../helpers/common-helper');

// This function gets all the list of the users
async function fetchUserByEmailID (request) {
    try {
        request.body.userID =  await commonHelper.userID(request)
      var results = await authMgmtDAL.fetchUserByUserID(request)
      if (results) {
         console.log('result', results);
        if (results.recCount > 0) {
          const result = {
          code:200,
          data: results.users,
          recCount: results.recCount
          }
        return result
          } else {
            return { recCount: 0 }
          }
      } else {
        throw new DBError('Data not found')
      }
    } catch (error) {
      throw error
    }
  }


  
// This function gets all the list of the users
async function fetchOrdersByUserID (request) {
    try {
        request.body.userID =  await commonHelper.userID(request)
      var results = await myaccountDAL.fetchUserOrdersByUserID(request)
      if (results) {
         console.log('result', results);
        if (results.recCount > 0) {
          const result = {
          code:200,
          data: results.users,
          recCount: results.recCount
          }
        return result
          } else {
            return { recCount: 0 }
          }
      } else {
        throw new DBError('Data not found')
      }
    } catch (error) {
      throw error
    }
  }
  
  
  module.exports = {
    fetchUserByEmailID: fetchUserByEmailID,
    fetchOrdersByUserID : fetchOrdersByUserID
  }