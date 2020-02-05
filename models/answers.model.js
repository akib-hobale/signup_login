const mongoose = require('mongoose');

const AnswersSchema = mongoose.Schema({
    questionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Question",
        required:true,
       },
       answer:{
           type:String,
           required:true
       },
       answer_type:{
           type:Boolean,
           default:false
       }
},{
    timestamps: true
})

module.exports = mongoose.model('Answers',AnswersSchema);