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
const uploadTask = multer({
    storage : storage
})

const storage2 = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, 'src/public/img')
    },
    filename : (req,file,cb) => {
        cb(null, file.originalname)
    }
})
const uploadUserPhoto = multer({
    storage : storage2
})


router.get('/teams/:id', homeController.userGetAll)

router.get('/index/:id', taskController.taskGetAll)
router.post('/index/:id', uploadTask.single('myImage') ,taskController.taskAdd)


router.get('/update/:id', taskController.taskUpdate)
router.post('/update/:id', taskController.taskUpdate)


router.get('/delete/:id', taskController.taskDelete)
router.post('/delete/:id', taskController.taskDelete)

router.get('/complete/:id', taskController.taskComplete)
router.post('/complete/:id', taskController.taskComplete)

router.post('/upload/:id', uploadUserPhoto.single('profilePhoto'), homeController.userPhoto)



// router.post("/uploadphoto/:id" , upload.single('myImage'),taskController.taskfileUpload)



module.exports = router