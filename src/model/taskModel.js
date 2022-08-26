const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description : {
        type : String,
        required : true,
        trim : true
    },
    employee : {
        type : String,
        required : true,
        trim : true
    },
    complete : {
        type : Boolean,
        default : false
    }
    
}, {collection : "tasks", timestamps: true})

const db = mongoose.model("tasks", taskSchema)


module.exports = db