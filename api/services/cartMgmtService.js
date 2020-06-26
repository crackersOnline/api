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
     request.body.userID = userID;
    }
    var itemCheck = await productMgmtDAL.fetchCartItemByUser(request);
    if(itemCheck) {
      if (itemCheck.recCount > 0) {
        if(request.body.productQuantity===0) {
          results = await productMgmtDAL.buildSaveTempCart(request, 'DELETE')
        } else {
          results = await productMgmtDAL.buildSaveTempCart(request, 'UPDATE')
        }
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


// This function gets all the list of the users
async function fetchCartData (request) {
  try {
    let userID =  await commonHelper.userID(request)
    if(userID) {
     request.body.userID = userID;
    }
    var results = await productMgmtDAL.fetchCartData(request)
    if (results) {
      if (results.recCount > 0) {
      var result = {
          code:200,
          data: results.data,
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
    // console.log('')
    throw error
  }
}

 
// This function gets all the list of the users
async function fetchCoupon (request) {
  try {
    var results = await productMgmtDAL.fetchCoupon(request)
    if (results) {
      if (results.recCount > 0) {
      var result = {
          code:200,
          data: results.data,
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
    // console.log('')
    throw error
  }
}
 module.exports = {
  tempCartSave : tempCartSave,
  fetchCartData:fetchCartData,
  fetchCoupon : fetchCoupon
 }