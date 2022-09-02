const userModel = require('../model/userModel')
const fs = require('fs')

const userGetAll = async (req,res) => {
    const {id} = req.params
    if(!req.session.userId){
        res.redirect('/login')
    }
    try {
        const user = await userModel.findById(id)
        const userGetAll = await userModel.find({})
        return res.render('todoWeb/teams' , {id : req.params.id , datas : userGetAll, data : user})
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error
        })
    }
}

const userPhoto = async (req,res) => {
    const { id } = req.params
    try {
        const user = await userModel.findById(id)

        fs.unlink('src/public/img/' + user.photo, function(err) {
            if(err) throw err
            console.log("delete!")
        })

        const userPhoto = await userModel.findByIdAndUpdate(id , {photo : req.file.filename})
        if(userPhoto) {
            return res.redirect('/homepage/teams/' + id)
        }
        else {
            return res.redirect('/homepage/teams/'+ id)
        } 

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Güncellenemedi"
        })
    }
}



module.exports = {
    userGetAll,
    userPhoto
}