'use strict'

// This function returns query to get all the demos based on programId for a given date from teradata
const buildfetchUserOrdersByUserIDQuery = (req) => {
  let query = "SELECT * FROM crackersdb.order INNER JOIN addressbook AS ab ON ab.addressID = order.deliveryAddress WHERE order.userID = '" + req.body.userID + "'";
  return query
}

const buildfetchDeliveryAddressByIDQuery = (req) => {
  let query = "SELECT * FROM crackersdb.addressbook WHERE  userID = '" + req + "'";
  return query;
}

module.exports = {
    buildfetchUserOrdersByUserIDQuery: buildfetchUserOrdersByUserIDQuery,
    buildfetchDeliveryAddressByIDQuery: buildfetchDeliveryAddressByIDQuery
}
