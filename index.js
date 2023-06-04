const express = require("express");
const morgan = require('morgan')
const mongoose = require('mongoose');
const app = express()
const bodyParser = require("body-parser")
const api = process.env.APP_URL;
require('dotenv/config')
const compression = require("compression")
const cors = require("cors")
// const cookieParser = require("cookie-parser")
// app.use(apiLimiter)

app.use(compression())
app.use(cors());
app.options('*', cors())
app.use(express.urlencoded({ extended: false }))

const indexRoutes = require('./routes/routes')


// middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/api/v1', indexRoutes)

app.all('/*', (req, resp, next) => {
    resp.header("Access-Control-Allow-Origin", "*")
    resp.header("Access-Control-Allow-Credentials", 'true')
    resp.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With,Content-Type,Accept,Key,Authorization')
    resp.header('Access-Control-Allow-Methods', "GET,POST,OPTIONS,PUT,DELETE,PATCH")
    next()
})


mongoose.connect(process.env.CONNECTION_STRING,{
   dbName:"zomatodb"
  })
    .then(() => {
        console.log("db connection is ready")
    }).catch((err) => {
        console.log(err)
    })

app.listen(9000, () => {
    console.log("server running on 9000");
})