'use strict'
const productMgmtDAL = require('../dataAccess/tdDAL/productMgmtDAL')
const DBError = require('../../common/exception/dbException')


// This function gets all the list of the users
async function tempCartSave (request) {
  try {
    let userID =  commonHelper.userID(req);
    var results = await productMgmtDAL.getProducts(request)
    if (results) {
      if (results.recCount > 0) {
        var masterData = lodash.groupBy(results.data, 'categoryName');
      // var masterData = lodash.mapValues(lodash.groupBy(data, 'categoryID'),
      // clist => clist.map(row => lodash.omit(row, 'categoryID')));     
      // console.log("clist",masterData);   
      var result = {
          code:200,
          data: Object.entries(masterData),
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
  tempCartSave : tempCartSave
 }