const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id:
    {
       type:mongoose.Types.ObjectId,
    }, 
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
    }
},
{
    timestamps: true
});

module.exports= mongoose.model('User',userSchema);