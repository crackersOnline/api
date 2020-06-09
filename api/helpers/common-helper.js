
const userID = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    var authorization = req.headers.authorization.split(' ')[1],
        decoded;
        decoded = jwt.verify(authorization, process.env.SECRET_KEY)
        res = { userID: decoded.id }
  }
  return res;
}

module.exports = {
  userID: userID
}

