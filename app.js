const express = require('express');
const app = express();

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin","X-Requested-With,Content-Type,Accept,Authorization");
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT,PATCH,POST,DELETE,GET");
        return res.status(200).json({})
    }
    next();
})

app.use('/product',productRoutes);
app.use('/user',userRoutes);

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