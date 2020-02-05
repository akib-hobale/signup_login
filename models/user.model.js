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
    quiz:[{
        exam:{
            type:mongoose.Schema.Types.ObjectId,
            default: 0,
             ref:"Subject",
             required:false,

             current_score:{
                 type:Number,
                 default:0,
                 required:false
             },
             previous_score:{
                 type:Number,
                 default:0,
                 required:false
             }             
            },
        }]
},
{
    timestamps: true
});

module.exports= mongoose.model('User',userSchema);