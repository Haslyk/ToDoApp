const mongoose = require('mongoose')

const statusSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    tasks : {
        type : Object,
        default : "none"
    },
    active : {
        type : Boolean,
        default : false
    }
}, {collection : "status", timestamps: true})

const db = mongoose.model("status", statusSchema)


module.exports = db

