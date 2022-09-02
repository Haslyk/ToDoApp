const taskModel = require('../model/taskModel')
const userModel = require('../model/userModel')
const statusModel = require('../model/statusModel')
const fs = require('fs')

const taskAdd = async (req,res) => {
    const {id} = req.params
    try {
        const _task = await taskModel.findOne({"title" : req.body.title})
        if(typeof(req.body.employee) == 'object'){
            req.body.employee = req.body.employee.join(' , ');
        }
        if(_task) {
            return res.redirect('/homepage/index/'+ id)
        }

        if(req.body.description == null)
        {
            req.body.description = "Açıklama yok"
        }

        var fileName = "none"
        if(req.file)
        {
            fileName = req.file.filename
        }
        
        const taskAdd = new taskModel({
            title : req.body.title ,
            description : req.body.description,
            employee : req.body.employee,
            file : fileName
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
        const statusGetAll = await statusModel.find({})
        const activeStatus = await statusModel.findOne({active : true})
        const taskGetAll = await taskModel.find({}).sort({updatedAt : -1})
        const userGet = await userModel.findById(id)

        return res.render('todoWeb/index' , {id : id , data : userGet , tasks : taskGetAll, users : userGetAll, allStatus : statusGetAll, activeStat : activeStatus} )
        
        
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
        const task = await taskModel.findById(req.body.id)
        console.log(task)
        if(task.file != "none")
        {
            fs.unlink('uploads/' + task.file, function(err) {
                if(err) throw err
                console.log("delete!")
            })
        }

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
        var status = "0"
        const isComplete = await taskModel.findById(req.body.id)
        if(isComplete.complete == false){
            status = "3"
        }

        const taskComplete = await taskModel.findByIdAndUpdate(req.body.id, {complete : !isComplete.complete, status : status})
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


const statusUpdate = async (req,res) => {
    const { id } = req.params
    try {

        var statusUpdate = {}

        if(req.body.status == "Tamamlandı") {
            statusUpdate = await taskModel.findByIdAndUpdate(id, {status : req.body.status, complete : true})
        }
        else {
            statusUpdate = await taskModel.findByIdAndUpdate(id, {status : req.body.status})
        }

        console.log(statusUpdate)

        if(statusUpdate) {
            return res.redirect('/homepage/index/' + req.session.userId)
        }
        else {
            return res.redirect('/homepage/index/'+ req.session.userId)
        } 

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Güncellenemedi"
        })
    }
}



module.exports = {
    taskAdd,
    taskGetAll,
    taskUpdate,
    taskDelete,
    taskComplete,
    // taskfileUpload
    statusUpdate
}