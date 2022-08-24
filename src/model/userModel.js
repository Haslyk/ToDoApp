const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    
    fullName : {
        type : String,
        required : true,
        trim : true

    },
    mail : {
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    isAdmin : {
        type: Boolean,
        default : false
    },
    linkedinLink : {
        type : String,
        default : "https://linkedin.com",
        trim : true
    },
    githubLink : {
        type : String,
        default : "https://github.com",
        trim : true,
    },
    photo : {
        type : String,
        default : "icon3.png",
        trim : true
    }
}, {collection : "users", timestamps: true})

const db = mongoose.model("users", userSchema)


module.exports = db