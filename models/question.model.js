const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
   subjectId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Subject",
    required:true,
   },
   question:{
    type:String,
    required:true
   },
   description:{
       type:String,
       required:false
   },
   question_type:{
       type:String,
       required:false
   }    
},{
    timestamps: true
});

module.exports= mongoose.model('Question',questionSchema);