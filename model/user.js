const mongoose = require('mongoose');

const userchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:String,
    password:String,
    email:String
})


module.exports = mongoose.model('user',userchema);