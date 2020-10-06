'use strict'

// This function returns query to get all the demos based on programId for a given date from teradata
const buildfetchUserOrdersByUserIDQuery = (req) => {
  let query = "SELECT * FROM crackersdb.order WHERE  userID = '" + req.body.userID + "'";
  return query
}

module.exports = {
    buildfetchUserOrdersByUserIDQuery: buildfetchUserOrdersByUserIDQuery
}
