const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    age:String,
    gender:String,
    number:String
})


module.exports = mongoose.model('students',studentSchema);