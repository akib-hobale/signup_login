const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({    
    subjectName:{
        type:String,
        require:true
    },
    subjectDescription:{
        type:String
    },
    examTime:{
        type:String
    },
    subjectImage:{
        type:String
    }
},
{
    timestamps: true
});

module.exports= mongoose.model('Subject',subjectSchema);