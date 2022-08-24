const express = require('express')
const path = require('path')
const app = express()
require('dotenv').config()
require('./src/config/dbConnection')

app.set("view engine", "pug")
app.set("views", "./src/views")

const port = process.env.PORT || 5001

const user = require('./src/router/userRouter')
const homepage = require('./src/router/homepageRouter')

app.use(express.json())
app.use(express.urlencoded({extended : false}))


app.use('/user' , user)
app.use('/homepage', homepage)



app.use(express.static(__dirname + '/src/public'));
app.use(express.static(__dirname + '/src/views'));
app.use(express.static("."));



app.get('/', (req,res) => {
    res.send("Merhabalar")
})



app.listen(port, () => {
    console.log(`Server ${port} portundan çalışıyor `)
})


//linkleri düzenlemem lazım router da yönlendirirken userGet te index verdim salak gibi