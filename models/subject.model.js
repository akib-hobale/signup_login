const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({
    _id:
    {
       type:mongoose.Types.ObjectId,
    }, 
    subjectName:{
        type:String,
        require:true
    }   
},
{
    timestamps: true
});

module.exports= mongoose.model('Subject',subjectSchema);