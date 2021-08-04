const {sum} =require('./helper');
const express = require('express');
var path = require('path');
const morgan = require('morgan');
const postUrl = require('./routes/post');
const dotEnv = require('dotenv');
const mongoose =  require('mongoose');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');


var app =express();
app.use(morgan('dev'))
var newrelic = require('newrelic');
app.locals.newrelic = newrelic;
dotEnv.config();
mongoose.connect("mongodb://localhost/robin",{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
console.log('db is connected')
   
})
mongoose.connection.on('error',err=>{
    console.log(`db connection error ${err.message}` )
})
// mongoose.connectOn(process.env.MONGO_URI)
// connectDb();
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/user');
app.use('/',postUrl)
app.use('/',bodyParser.json(),expressValidator(),authRoutes)
app.use('/',bodyParser.json(),expressValidator(),usersRoutes)
app.use(expressValidator());
app.use(bodyParser.json());
const PORT = process.env.PORT || 8085
app.listen(
    PORT,
    console.log(`server run on the ${PORT}`)
    );

