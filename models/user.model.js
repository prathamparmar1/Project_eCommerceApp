const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },

    userId : {
        type : String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    email :{
        type: String,
        required: true,
        lowecase : true,
        minlength : 10,
        unique : true
    },  
    
    userType :{
        type : String,
        required : true,
        default : "CUSTOMER",
        enum : ["CUSTOMER", "ADMIN"]
    }
},{versionKey: false, timestamps: true})

module.exports = mongoose.model("User", userSchema)