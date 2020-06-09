const express = require("express")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")
const userRoutes = require("./api/routes/userRoutes.js")
const productRoutes = require("./api/routes/productRoutes.js")

const cors = require('cors')
const errorHandler = require('./api/helpers/error-handler');


const app = express();
app.use(cors());

// parse request of content-type: application/json
app.use(bodyParser.json());

// parse request of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}))
app.use(expressJwt({secret: process.env.SECRET_KEY}).unless({path: ['/api/user/auth', '/api/user/register', 'api/user/tokenVerify']}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    next()
  })

// Simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to Mathar Rest API"})
})
// app.use(authenticateToken);
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)

// global error handler
 app.use(errorHandler);


app.set('port', process.env.PORT)
app.listen(process.env.PORT, () => {
    console.log(" Server is running on port", process.env.PORT)
})

// module.exports = app