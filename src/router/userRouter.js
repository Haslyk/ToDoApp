const router = require('express').Router()
const userController = require('../controller/userController')
const path = require('path')

router.get('/register', (req,res) => {
    res.render('login/register')
})

router.post('/register', userController.userAdd)

router.get('/login', (req,res) => {
    res.render('login/login')
})

router.post('/login', userController.userCheck)


module.exports = router
