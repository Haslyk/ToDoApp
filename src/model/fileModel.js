const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    length : {
        type : Number,
        required : true,
        trim : true
    },
    chunkSize : {
        type : Number,
        trim : true
    },
    uploadDate : {
        type : Date,
        trim : true
    },
    filename : {
        type : String,
        default : false
    },
    contentType : {
        type : String,
        trim : true
    }
    
}, {collection : "fs.files", timestamps: true})

const db = mongoose.model("fs.files", fileSchema)


module.exports = db