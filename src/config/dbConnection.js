const mongoose = require('mongoose')
const express = require('express')
const app = express()

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => {
    console.log("Başarıyla bağlandı")
})
.catch((err) => {
    console.log("Bağlanılamadı : " +  err)
})