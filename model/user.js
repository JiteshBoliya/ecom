const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isAlpha(value)) throw new Error("Invalid name")
        }
    },
    email: { 
        type: String, 
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value))throw new Error("Invalid email")
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(!value.length>6) throw new Error("Invalid password")
        }
    },
    tokens:[
        {
            token:{
                type: String,
                required: true,
            }
        }
    ]
},{timeStamp:true}
);

//Generate Token
userSchema.methods.genrateAuthToken = async function () {
    const user=this
    const token =jwt.sign({_id: user._id.toString()},"privatekey")
    user.tokens=user.tokens.concat({ token });
    await user.save()
    return token
}

//Find email and compare password
userSchema.statics.findByCredentials = async (email, password) => {
    const user= await User.findOne({email})
    if(!user) throw new Error("Couldn't find Email")
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) throw new Error("Unable to login")
    return user
}

//Encrypt password using bcrypt hash algorithm
userSchema.pre('save',async function (next) {
    const user=this
    if(user.isModified("password")) user.password= await bcrypt.hash(user.password,8)
    next()
})

const User= mongoose.model("User",userSchema);
module.exports = User

