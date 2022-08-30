const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        default : "Açıklama yok",
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
    },
    photo : {
        type : String,
        default : null,
        trim : true
    },
    img : {
        data : Buffer, 
        contentType : String
    }
    
}, {collection : "tasks", timestamps: true})

const db = mongoose.model("tasks", taskSchema)


module.exports = db