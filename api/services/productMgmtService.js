'use strict'
const productMgmtDAL = require('../dataAccess/tdDAL/productMgmtDAL')
const lodash = require('lodash')
const DBError = require('../../common/exception/dbException')

// This function gets all the list of the users
async function getProducts (request) {
  try {
    
    console.log('controller', request.body);
    var results = await productMgmtDAL.getProducts(request)
    if (results) {
      if (results.recCount > 0) {
        var masterData = lodash.groupBy(results.data, 'categoryName');
      // var masterData = lodash.mapValues(lodash.groupBy(data, 'categoryID'),
      // clist => clist.map(row => lodash.omit(row, 'categoryID')));     
     // // console.log("clist",masterData);   
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
     console.log('error', error);
    throw error
  }
}

// Function is used to insert the user
async function createProduct (request) {
  var results = {}
  try {
    var data = await productMgmtDAL.createProduct(request)
    if (data) {
      results = { RecordCount: data.rows.affectedRows }
      return results
    }
  } catch (error) {
    // console.log(error)
    throw error
  }
}

// Function is used to update the user
async function updateProduct (request) {
  var results = {}
  try {
    var data = await productMgmtDAL.updateDashboardReport(request)
    if (data) {
      results = { RecordCount: data.userSave.affectedRows }
      return results
    }
  } catch (error) {
    // console.log(error)
    throw error
  }
}

// Function is used to get all list of Masters
async function getCategories(request) {
  try {
    var results = await productMgmtDAL.fetchCategories(request)
    if (results) {
      if (results.recCount > 0) {
        return results;
      } else {
        return { results: 0 }
      }
    } else {
      throw new DBError('Data not found')
    }
  } catch (error) {
    // console.log(error)
    throw error
  }
}

module.exports = {
  getProducts: getProducts,
  getCategories: getCategories,
  createProduct: createProduct,
  updateProduct: updateProduct

}
