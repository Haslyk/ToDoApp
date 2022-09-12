const router = require('express').Router()
const taskController = require('../controller/taskController')
const homeController = require('../controller/homePageController')
const statusController = require('../controller/statusController')
const multer = require('multer')

// const Grid = require('gridfs-stream');
//  const {GridFsStorage } = require('multer-gridfs-storage');
//  const url = 'mongodb://localhost:27017/ToDoApp'

//  const storage = new GridFsStorage({ url });



const storageFile = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, 'uploads')
    },
    filename : (req,file,cb) => {
        cb(null, req.body.imgId + file.originalname)
    }
})
const uploadTask = multer({
    storage : storageFile
})

const storageUserPhoto = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, 'src/public/img')
    },
    filename : (req,file,cb) => {
        cb(null, file.originalname)
    }
})
const uploadUserPhoto = multer({
    storage : storageUserPhoto
})


router.get('/teams/:id', homeController.userGetAll)

router.get('/index/:id', taskController.taskGetAll)


router.post('/add/:id', uploadTask.single('myImage') ,taskController.taskAdd)
router.post('/update/:id', taskController.taskUpdate)
router.post('/delete/:id', taskController.taskDelete)
router.post('/complete/:id', taskController.taskComplete)

router.post('/upload/:id', uploadUserPhoto.single('profilePhoto'), homeController.userPhoto)

router.post('/taskStatusUpdate/:id', taskController.statusUpdate)

router.get('/status/:id', statusController.statusGetAll)

router.post('/status/:id', statusController.statusAdd)
router.post('/statusUpdate/:id', statusController.statusUpdate)
router.post('/statusDelete/:id', statusController.statusDelete)
router.post('/statusPage/:id', statusController.statusActiveUpdate)



module.exports = router