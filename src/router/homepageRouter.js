const router = require('express').Router()
const taskController = require('../controller/taskController')
const homeController = require('../controller/homePageController')
const multer = require('multer')

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, 'uploads')
    },
    filename : (req,file,cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage : storage
})


router.get('/teams/:id', homeController.userGetAll)

router.get('/index/:id', taskController.taskGetAll)
router.post('/index/:id', upload.single('myImage') ,taskController.taskAdd)


router.get('/update/:id', taskController.taskUpdate)
router.post('/update/:id', taskController.taskUpdate)


router.get('/delete/:id', taskController.taskDelete)
router.post('/delete/:id', taskController.taskDelete)

router.get('/complete/:id', taskController.taskComplete)
router.post('/complete/:id', taskController.taskComplete)




// router.post("/uploadphoto/:id" , upload.single('myImage'),taskController.taskfileUpload)



module.exports = router