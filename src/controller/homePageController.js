const userModel = require('../model/userModel')

const userGetAll = async (req,res) => {
    try {
        const userGetAll = await userModel.find({})
        return res.render('todoWeb/teams' , {id : req.params.id , datas : userGetAll} )
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error
        })
    }
}

const userGet = async (req,res) => {
    const {id} = req.params
    try {
        const userGet = await userModel.findById(id)
        return res.render('todoWeb/index' , {id : req.params.id , data : userGet} )
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error
        })
    }
}

module.exports = {
    userGetAll,
    userGet
}