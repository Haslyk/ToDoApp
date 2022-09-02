const taskModel = require('../model/taskModel')
const userModel = require('../model/userModel')
const statusModel = require('../model/statusModel')


const statusGetAll = async (req,res) => {
    const {id} = req.params
    if(!req.session.userId){
        res.redirect('/login')
    }
    try {
        const user = await userModel.findById(id)
        const statusGetAll = await statusModel.find({})

        return res.render('todoWeb/status' , {id : id ,  data : user, statusDatas : statusGetAll} )
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error
        })
    }

}

const statusAdd = async (req,res) => {
    const {id} = req.params
    console.log(req.body)
    try {
        const _status = await statusModel.findOne({"name" : req.body.name})
        
        if(_status) {
            return res.redirect('/homepage/status/'+ id)
        }

        const statusAdd = new statusModel(req.body)

        await statusAdd.save()
            .then(() => {
                return res.redirect('/homepage/status/'+ id)
            })
            .catch((err) => {
                return res.redirect('/homepage/status/'+ id)
            })

    } catch (error) {
        return res.status(500).json({error})
    }
}


const statusUpdate = async (req,res) => {
    const { id } = req.params
    try {

        const status = await statusModel.findById(req.body.id)
        const task = await taskModel.find({status : status.name})


        var taskUpdate = {}

        for(let i = 0 ; i < task.length ; i++)
        {
            taskUpdate = await taskModel.findByIdAndUpdate(task[i].id , {status: req.body.name})
        }
 

        const statusUpdate = await statusModel.findByIdAndUpdate(req.body.id, req.body)
        
        if(statusUpdate && taskUpdate) {
            return res.redirect('/homepage/status/' + id)
        }
        else {
            return res.redirect('/homepage/status/'+ id)
        } 

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Güncellenemedi"
        })
    }
} 

const statusActiveUpdate = async (req,res) => {
    const { id } = req.params
    console.log(req.body)
    try {

        const status = await statusModel.findOneAndUpdate({active : true}, {active : false})

        const update = await statusModel.findByIdAndUpdate(req.body.status, {active : true})
        
        if(update && status)
        {
            return res.redirect('/homepage/index/'+ id)
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

const statusDelete = async (req,res) => {
    const { id } = req.params
    try {
        const status = await statusModel.findById(req.body.id)
        const task = await taskModel.find({status : status.name})

        var taskUpdate = {}

        for(let i = 0 ; i < task.length ; i++)
        {
            taskUpdate = await taskModel.findByIdAndUpdate(task[i].id , {status: "Durum atanmadı"})
        }

        const statusDelete = await statusModel.findByIdAndDelete(req.body.id)
        if(statusDelete) {
            return res.redirect('/homepage/status/' + id)
        }
        else return res.redirect('/homepage/status/' + id)

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Silinemedi" + error
        })
    }
}



module.exports = {
    statusGetAll,
    statusAdd,
    statusUpdate,
    statusActiveUpdate,
    statusDelete
}