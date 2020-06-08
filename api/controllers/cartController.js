'use strict'
const saveCart = async (req, res, next) => {
  if(!req.body) {
    res.status(400).send({
      code: 400,
      message: "content cannot be empty."
    })
  }

  cartModel.saveCartSession(req.body, (err, data) => {
    if(err) {
      res.status(500).send({
        code: 500,
        message: 
        err.message || 'Some error occurred while creating the Customer'
    });
    } else { 
      res.status(200).send({
          code: 200,
          data: data
      });
    }
  })
  
}

module.exports = {
  saveCart: saveCart,
}