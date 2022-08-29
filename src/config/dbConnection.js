const mongoose = require('mongoose')
const express = require('express')

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