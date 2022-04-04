const mongoose = require('mongoose')
const typeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    }
},{timestamps: true})
const Type= mongoose.model('Type',typeSchema)
module.exports = Type