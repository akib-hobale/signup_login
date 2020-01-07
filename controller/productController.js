
const Product = require('../models/product.model');
const mongoose = require('mongoose')



 function list(req,res,next){ 
    Product.find().then(result=>{
        res.status(200).json({
            message:"Get Records",
            result:result
        })

    }).catch(err=>{
        console.log(err)
    });  
}


 function addProduct(req,res,next){
    const product = new Product({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    })

    product
    .save()
    .then(res =>{
        console.log(res)
        }).catch(err =>{
            console.log(err)
        })

    res.status(200).json({
        message:"Product Add Successfully",
        CreateProduct:product
    })
}


module.exports.list = list;
module.exports.addProduct = addProduct;
