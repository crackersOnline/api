const express = require("express")
const bodyParser = require("body-parser")
const userRoutes = require("./api/routes/userRoutes.js")

const app = express();

// parse request of content-type: application/json
app.use(bodyParser.json());

// parse request of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}))

// Simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to Mathar Rest API"})
})

app.use("/api/user", userRoutes)

app.set('port', process.env.PORT)
app.listen(process.env.PORT, () => {
    console.log(" Server is running on port", process.env.PORT)
})

// module.exports = app