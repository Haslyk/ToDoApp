const mongoose = require('mongoose')

const taskfileSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    img : {
        data : Buffer, 
        contentType : String
    }
    
}, {collection : "taskFiles", timestamps: true})

const db = mongoose.model("taskFiles", taskfileSchema)


module.exports = db