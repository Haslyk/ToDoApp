const taskModel = require('../model/taskModel')
const userModel = require('../model/userModel')
const fs = require('fs')

const taskAdd = async (req,res) => {
    const {id} = req.params
    try {
        const _task = await taskModel.findOne({"description" : req.body.description})
        if(typeof(req.body.employee) == 'object'){
            req.body.employee = req.body.employee.join(' , ');
        }
        if(_task) {
            return res.redirect('/homepage/index/'+ id)
        }

        var photoName = "none"
        if(req.file)
        {
            var img = fs.readFileSync(req.file.path);
            var encode_img = img.toString('base64');
            var final_img = {
                contentType:req.file.mimetype,
                image:new Buffer(encode_img,'base64'),
                name : req.file.filename
            };
            photoName = req.file.filename
        }
        
        const taskAdd = new taskModel({
            title : req.body.title ,
            description : req.body.description,
            employee : req.body.employee,
            photo : photoName
        })

        await taskAdd.save()
            .then(() => {
                return res.redirect('/homepage/index/'+ id)
            })
            .catch((err) => {
                return res.redirect('/homepage/index/'+ id)
            })

    } catch (error) {
        return res.status(500).json({error})
    }
}

const taskGetAll = async (req,res) => {
    const { id } = req.params
    if(!req.session.userId){
        res.redirect('/login')
    }
    try {
        const userGetAll = await userModel.find({})
        const taskGetAll = await taskModel.find({}).sort({updatedAt : -1})
        const userGet = await userModel.findById(id)

        var checkEmployee = null

        for(let i = 0; i < taskGetAll.length; i++) {
           if(taskGetAll[i].employee.includes(userGet.fullName) == true) {
            checkEmployee = taskGetAll[i].employee.includes(userGet.fullName)
           }
        }


        return res.render('todoWeb/index' , {id : id , data : userGet , tasks : taskGetAll, users : userGetAll, session: req.session} )
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error
        })
    }
}

const taskUpdate = async (req,res) => {
    const { id } = req.params
    const userId = id.split('&')[0]
    const taskId = id.split('&')[1]
    try {
        
        if(typeof(req.body.employee) == 'object'){
            req.body.employee = req.body.employee.join(' , ');
        }
        const _task = await taskModel.findOne({"description" : req.body.description})
        if(_task) {
            return res.redirect('/homepage/index/'+ userId)
        }


        const taskUpdate = await taskModel.findByIdAndUpdate(taskId, req.body)
        
        if(taskUpdate) {
            return res.redirect('/homepage/index/' + userId)
        }
        else {
            return res.redirect('/homepage/index/'+ userId)
        } 

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Güncellenemedi"
        })
    }
} 

const taskDelete = async (req,res) => {
    const { id } = req.params
    try {
        const taskDelete = await taskModel.findByIdAndDelete(req.body.id)
        if(taskDelete) {
            return res.redirect('/homepage/index/' + id)
        }
        else return res.redirect('/homepage/index/' + id)

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Silinemedi" + error
        })
    }
}

const taskComplete = async (req,res) => {
    const { id } = req.params
    try {
        const isComplete = await taskModel.findById(req.body.id)
        const taskComplete = await taskModel.findByIdAndUpdate(req.body.id, {complete : !isComplete.complete})
        if(taskComplete) {
            return res.redirect('/homepage/index/' + id)
        }
        else {
            return res.redirect('/homepage/index/'+ id)
        } 

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Güncellenemedi"
        })
    }
} 

// const taskfileUpload = (req,res) => {
//     const { id } = req.params
//     var img = fs.readFileSync(req.file.path);
//     var encode_img = img.toString('base64');
//     var final_img = {
//         contentType:req.file.mimetype,
//         image:new Buffer(encode_img,'base64'),
//         name : req.file.filename
//     };
//     imgModel.create(final_img,function(err,result){
//         if(err){
//             console.log(err);
//         }else{
//             console.log(result.img.Buffer);
//             console.log("Saved To database");
//             res.contentType(final_img.contentType);
//             res.redirect('/homepage/index/' + id)
//         }
//     })
// }



module.exports = {
    taskAdd,
    taskGetAll,
    taskUpdate,
    taskDelete,
    taskComplete,
    // taskfileUpload
}