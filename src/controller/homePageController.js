const userModel = require('../model/userModel')

const userGetAll = async (req,res) => {
    if(!req.session.userId){
        res.redirect('/login')
    }
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



module.exports = {
    userGetAll
}