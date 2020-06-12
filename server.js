const express = require("express")
const bodyParser = require("body-parser")
const expressJwt = require("express-jwt")
const expressValidator = require('express-validator')
const userRoutes = require("./api/routes/userRoutes.js")
const productRoutes = require("./api/routes/productRoutes.js")

const helmet = require('helmet')
const validatorAndSanitizer = require('./api/validators/sanitizers_and_validators.js')
const exceptionLogger = require('./common/logger/exceptionLogger')
const cors = require('cors')
const errorHandler = require('./api/helpers/error-handler');


const app = express();
app.use(cors());
  
// parse request of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}))
// parse request of content-type: application/json
app.use(bodyParser.json());
app.use(expressValidator(validatorAndSanitizer)) // This line must be immediately after express.bodyParser()!
app.use(helmet())

app.use(expressJwt({secret: process.env.SECRET_KEY}).unless({
    path: ['/api/user/auth', '/api/user/register', '/api/user/tokenVerify', '/api/user/emailExist', '/api/user/verfiyPIN', '/api/user/forgotPwd', '/api/user/resetPwd']}));

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

module.exports = app