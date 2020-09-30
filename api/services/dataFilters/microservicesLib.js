'use strict'

const _ = require('lodash')

const microservicesLib = {
  getSimpleDateString: (dateObject) => {
    return [
      dateObject.getUTCMonth() + 1,
      dateObject.getUTCDate(),
      dateObject.getUTCFullYear()
    ].join('/')
  },

  capitalizeAndTrimWhitespace: (strings) => {
    if (Array.isArray(strings)) {
      return strings.map(string => _.trim(string).toUpperCase())
    } else {
      return _.trim(strings).toUpperCase()
    }
  },

  buildApiResponse: (dbResultsAsArray, dataSourceColumnName, demoColumnName, filterObjectData) => {
    const dataSourceGroups = _.groupBy(dbResultsAsArray, dataSourceColumnName)
    for (const dataSource in dataSourceGroups) {
      const demoGroups = _.groupBy(dataSourceGroups[dataSource], demoColumnName)
      filterObjectData(demoGroups)
      dataSourceGroups[dataSource] = demoGroups
    }
    return dataSourceGroups
  }
}

module.exports = microservicesLib
