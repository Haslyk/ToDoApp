const taskModel = require('../model/taskModel')
const userModel = require('../model/userModel')

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
        const taskAdd = new taskModel(req.body)
        console.log(taskAdd)
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
    try {
        const userGetAll = await userModel.find({})
        const taskGetAll = await taskModel.find({})
        const userGet = await userModel.findById(id)

        return res.render('todoWeb/index' , {id : id , data : userGet , tasks : taskGetAll, users : userGetAll} )
        
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
        const taskUpdate = await taskModel.findByIdAndUpdate(taskId, req.body)
        console.log(taskUpdate)
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


module.exports = {
    taskAdd,
    taskGetAll,
    taskUpdate,
    taskDelete,
    taskComplete
}