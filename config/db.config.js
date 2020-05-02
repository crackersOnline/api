// const env = require('')
require('dotenv').config();
module.exports = {
    HOST: process.env.DB_ENDPOINT,
    USER: process.env.DB_USERNAME,
    PASSWORD:process.env.DB_PASSWORD,
    DB: process.env.DB_NAME
}