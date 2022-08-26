const router = require('express').Router()
const loginController = require('../controller/loginController')
router.get('/register', (req,res) => {
    res.render('login/register')
})

router.post('/register', loginController.userAdd)

router.get('/login', (req,res) => {
    res.render('login/login')
})

router.post('/login', loginController.userCheck)


module.exports = router
