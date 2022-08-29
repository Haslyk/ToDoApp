const express = require('express')
const path = require('path')
const app = express()
require('dotenv').config()
require('./src/config/dbConnection')
const session = require('express-session')


app.use(session({
    secret : "mykeytodoapp",
    resave : false,
    saveUninitialized : true
}))

app.set("view engine", "pug")
app.set("views", "./src/views")



const port = process.env.PORT || 5001

const user = require('./src/router/userRouter')
const homepage = require('./src/router/homepageRouter')

app.use(express.json())
app.use(express.urlencoded({extended : false}))




app.use('/' , user)
app.use('/homepage', homepage)


app.use(express.static(__dirname + '/src/public'));
app.use(express.static(__dirname + '/src/views'));
app.use(express.static("."));


app.get('/', (req,res) => {
    res.render('login/login')
})



app.listen(port, () => {
    console.log(`Server ${port} portundan çalışıyor `)
})

