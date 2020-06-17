'use strict'
const productMgmtDAL = require('../dataAccess/tdDAL/productMgmtDAL')
const DBError = require('../../common/exception/dbException')
const commonHelper =  require('../helpers/common-helper')


// This function gets all the list of the users
async function tempCartSave (request) {
  try {
    var results = {}
    let userID =  await commonHelper.userID(request)
    if(userID) {
      console.log('userID', userID);
     request.body.userID = userID;
    }
    var itemCheck = await productMgmtDAL.fetchCartItemByUser(request);
    if(itemCheck) {
      console.log('itemCheck', itemCheck)
      if (results.recCount > 0) {
        results = await productMgmtDAL.buildSaveTempCart(request, 'UPDATE')
      } else {
        results = await productMgmtDAL.buildSaveTempCart(request, 'INSERT')
      }
      if (results) {
        if (results.recCount > 0) {
        var result = {
            code:200,
            data: results.userSave,
            recCount: results.recCount
        }
          return result
        } else {
          return { recCount: 0 }
        }
      } else {
        throw new DBError('Data not found')
      }
    }
  } catch (error) {
    // console.log('')
    throw error
  }
}

 
 module.exports = {
  tempCartSave : tempCartSave
 }