'use strict'
const _ = require('lodash')
require('express-validator')

const getNumberOrNull = (potentialNumber) => {
  const newNumber = Number(potentialNumber)
  return Number.isInteger(newNumber) ? newNumber : null
}

module.exports = {
  customSanitizers: {
    toCsvOfNumbers: (value) => {
      const parameters = value.split(',')
      const validNumbers = []
      let newNumber
      for (const parameter of parameters) {
        newNumber = getNumberOrNull(parameter)
        if (newNumber) {
          validNumbers.push(Number(parameter))
        }
      }
      return validNumbers.join(',')
    },

    toNumber: (value) => {
      return getNumberOrNull(value)
    }
  },
  customValidators: {
    isIntegerList: (value) => {
      value = value || ''
      return _.every(value.split(','), (maybeInt) => {
        return (typeof getNumberOrNull(maybeInt)) === 'number'
      })
    },
    isString: (value) => {
      return typeof value === 'string'
    },
    isTimeValid: (value) => {
      return (value.match(/^[0-9]{2}:[0-9]{2}:[0-9]{2}$/))
    },
    isBlank: (value) => {
      return (value && value.trim().length)
    },
    isAlphanumericList: (value) => {
      const regExp = /^[A-Za-z0-9,+-]*$/
      const values = value.split(',')
      let isValid = true
      for (let index = 0; index < values.length; index++) {
        if (!values[index].toString().match(regExp)) {
          isValid = false
        }
      }
      return isValid
    },
    // To validate the demo format
    isAlphaNumeric: (value) => {
      const regExp = /^[A-Za-z0-9,+-]*$/
      let isValid = false
      if (value && value.match(regExp)) {
        isValid = true
      }
      return isValid
    },

    // To check the date format
    isValidDateFormat: (value) => {
      const regExp = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/
      let isValid = false
      if (value.match(regExp)) {
        isValid = true
      }
      return isValid
    },
    isAlphaNumericTmsID: (value) => {
      return (value.length > 0 && value.toString().isAlphanumeric())
    },
    // To validate thhe day of week
    isValidDayOfWeek: (value) => {
      value = value || ''
      return _.every(value.split(','), (num) => {
        const convertedNum = getNumberOrNull(num)
        return convertedNum > 0 && convertedNum < 8
      })
    }
  }
}
