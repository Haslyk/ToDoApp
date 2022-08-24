const router = require('express').Router()

const homeController = require('../controller/homePageController')

router.get('/index/:id', homeController.userGet)



router.get('/teams/:id', homeController.userGetAll )





module.exports = router