const userModel = require('../model/userModel')

const userAdd = async (req,res) => {
    try {
        const _user = await userModel.findOne({"mail" : req.body.mail})

        if(_user) {
            return res.render('login/register', {success : false, message : "Kayıt zaten var..."})
        }

        const userAdd = new userModel(req.body)
        await userAdd.save()
            .then(() => {
                res.render('login/register', {success : true, message : "Başarıyla kayıt olundu..."})
            })
            .catch((err) => {
                res.render('login/register', {success : false, message : "Kayıt sırasında hata oluştu..."})
            })

    } catch (error) {
        return res.render('login/register', {success : false, message : "Sunucu hatası oluştu..."})
    }
}

const userCheck = async (req,res) => {
    console.log(req.body)
    try {
        const _user = await userModel.findOne({"mail" : req.body.mail})
        console.log("Login kontrolu yapıldı")
        
        if(_user){
            if(_user.password == req.body.password) {
                req.session.userId = _user._id
                return res.redirect('/homepage/index/' + req.session.userId)
            }
            else {
                return res.render('login/login', {success : false, message : "Hatalı giriş yaptınız..."})
            }
        }
        else {
            return res.render('login/login', {success : false, message : "Hatalı giriş yaptınız..."})
        }

        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Sunucu hatası" + error
        })
    }
}




module.exports = {
    userAdd,
    userCheck
}