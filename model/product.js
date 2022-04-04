const mongoose = require('mongoose')
const productSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true
    },
    description:{
        type:String,
        required: true
    },
    type:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Type"
    },
    // like:{
    //     type:Number,
    // },
    // dislike:{
    //     type:Number,
    // },
    like:[{
        owner:mongoose.Schema.Types.ObjectId,
        isLiked:Boolean
    }],
    comments:[{
        comment:{
            type:String,
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }
},{timestamps: true})
const Product= mongoose.model('Product',productSchema)
module.exports=Product