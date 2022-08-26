const router = require('express').Router()
const taskController = require('../controller/taskController')
const homeController = require('../controller/homePageController')


router.get('/teams/:id', homeController.userGetAll)

router.post('/index/:id', taskController.taskAdd)

router.get('/index/:id', taskController.taskGetAll)

router.get('/update/:id', taskController.taskUpdate)
router.post('/update/:id', taskController.taskUpdate)


router.get('/delete/:id', taskController.taskDelete)
router.post('/delete/:id', taskController.taskDelete)

router.get('/complete/:id', taskController.taskComplete)
router.post('/complete/:id', taskController.taskComplete)



module.exports = router