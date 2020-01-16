const express = require('express');
const app = express();
const morgan = require('morgan');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const subjects = require('./routes/subjectRoutes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//globals defined
if(!global.appRoot)
global.appRoot=__dirname;

if (!global.Response)
global.Response = require('./utils/Response');  //response structure makes global


if (!global.STATUS_CODE)
global.STATUS_CODE = require('./constants/StatusCodes');    //status codes used for sending response makes global


if (!global.CUSTOM_MESSAGE)
global.CUSTOM_MESSAGE = require('./constants/CustomMessages');  //messages used for sending response makes global


if (!global.ENVCONFIG)
global.ENVCONFIG =require("./config/dev.env.config");  //change enviorment of project from here 


//mongoDB database connection
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(ENVCONFIG.url, {
    useNewUrlParser: true,
    useCreateIndex : true

}).then(() => {
    console.log(`MongoDB successfully connected to the "${ENVCONFIG.NAME}" database`);    
}).catch(err => {
    console.log(`Could not connect to the "${ENVCONFIG.NAME}" database. Exiting now...`, err);
    process.exit();
});


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));




app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin","X-Requested-With,Content-Type,Accept,Authorization");
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods","POST,GET,DELETE,PUT,PATCH");
        return res.status(200).json({})
    }
    next();
})

app.use('/product',productRoutes);
app.use('/user',userRoutes);
app.use('/subjects',subjects);


// app.use()

app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status(404);
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})

module.exports = app;