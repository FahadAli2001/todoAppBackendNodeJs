const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:String,
    description:String
})

module.exports = mongoose.model('Todo',todoSchema)