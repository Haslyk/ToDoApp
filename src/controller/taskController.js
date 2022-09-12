const taskModel = require('../model/taskModel')
const userModel = require('../model/userModel')
const statusModel = require('../model/statusModel')
const fs = require('fs')
const nodemailer = require('nodemailer')


const taskAdd = async (req,res) => {
    console.log(req.body)
    const {id} = req.params
    try {
        
        const dateArr = req.body.finishDate.split('T')
        const _task = await taskModel.findOne({"title" : req.body.title})
        var mailArr = []

        

        if(typeof(req.body.employee) == 'object'){
            for (let i = 0; i < req.body.employee.length; i++) {
                var mail = await userModel.findOne({fullName : req.body.employee[i]})
                mailArr.push(mail.mail)
            }
            req.body.employee = req.body.employee.join(' , ');
        }
        else {
            var mail = await userModel.findOne({fullName : req.body.employee})
            mailArr.push(mail.mail)
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
            file : fileName,
            importance : req.body.importance,
            finishDate : dateArr
        })

        await taskAdd.save()
            .then(() => {
                sendMail(mailArr,req.body.title, req.body.description, dateArr) 
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
        var now = new Date()
        const dateArr = [
            year = now.getFullYear(),
            month = now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1,
            day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate(),
        ]
        const timeArr = [
            hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours(),
            minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes(),
        ]
        const date = dateArr.join('-')
        const time = timeArr.join(':')
    

        const userGetAll = await userModel.find({})
        const userGet = await userModel.findById(id)
        const statusGetAll = await statusModel.find({})
        const activeStatus = await statusModel.findOne({active : true})
        const taskGetAll = await taskModel.find({}).sort({complete : 1 ,importance : -1, updatedAt : -1})

        return res.render('todoWeb/index' , {id : id , data : userGet , tasks : taskGetAll, users : userGetAll ,allStatus : statusGetAll, activeStat : activeStatus, date: date, time: time} )
        
        
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

        const dateArr = req.body.finishDate.split('T')

        if(typeof(req.body.employee) == 'object'){
            req.body.employee = req.body.employee.join(' , ');
        }
        const _task = await taskModel.findOne({"title" : req.body.title})
        if(_task) {
            return res.redirect('/homepage/index/'+ userId)
        }


        const taskUpdate = await taskModel.findByIdAndUpdate(taskId, {description : req.body.description, importance : req.body.importance, employee : req.body.employee, finishDate : dateArr})
        
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

 function sendMail (mailTo, task, description, finishDate) {
        var mails = ""

        console.log(finishDate)

        for (let i = 0; i < mailTo.length; i++) {
            mails += mailTo[i] + ","
        }


        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'aktekmailbot@gmail.com',
                pass: 'tdnxypejvlhpcvdw'
            }
        });
        transporter.verify(function (error, success) {

            if (error) console.log("Hata var!!");
        
            console.log('Bağlantı başarıyla sağlandı');
        
        });

        const bilgiler = {
            from: `"Deneme Aktek" <aktekmailbot@gmail.com>`,
            to: `${mails}`,
            subject: 'Yeni Görev Eklendi',
            text: `
            Görev Başlığı: ${task}

            Görev Açıklaması: ${description}

            Son Teslim Tarihi: ${finishDate[0]} , ${finishDate[1]}
                `
        };

        transporter.sendMail(bilgiler, function (error, info) {
            if (error) throw error;
            console.log('Eposta gönderildi ' + info.response);
        });
}


module.exports = {
    taskAdd,
    taskGetAll,
    taskUpdate,
    taskDelete,
    taskComplete,
    statusUpdate
}