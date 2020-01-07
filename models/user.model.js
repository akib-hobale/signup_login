const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    email:String,
    first_name:String
});

module.exports= mongoose.model('User',userSchema);