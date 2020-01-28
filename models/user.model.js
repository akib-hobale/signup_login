const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email:{
        type:String
    },
    first_name:
    {
        type:String
    },
    last_name:
    {
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String
    },
    phone_no :{
        type: String
    },
},
{
    timestamps: true
});

module.exports= mongoose.model('User',userSchema);