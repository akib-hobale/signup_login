const mongoose = require('mongoose');

const jwtTokenSchema = mongoose.Schema({
    token : {
        type :String
    },
    userId : {
        type : String,
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('JwtToken', jwtTokenSchema);