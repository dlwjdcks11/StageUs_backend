const router = require('express').Router();
const mongoose = require('mongoose');
const UserLog = require('./schema/logSchema');

router.post('', (req, res) => {
    mongoose.connect(
        "mongodb+srv://stageus:1234@cluster0.bqzef.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        } // 옵션 꼭 필요, 비동기 통신
    )
    .then(() => {
        if (req.body.apiName === "CONNECT") {
            const Log = new UserLog({
                apiName: req.body.apiName,
                description: req.body.description,
            })
            Log.save();
        }
        else if (req.body.apiName === "REGISTER") {
            const Log = new UserLog({
                apiName: req.body.apiName,
                description: req.body.description,
                id: req.body.id,
                pw: req.body.pw,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                stuNum: req.body.stuNum,
                school: req.body.school
            })
            Log.save();
        }
        else if (req.body.apiName === "MODIFY") {
            const Log = new UserLog({
                apiName: req.body.apiName,
                description: req.body.description,
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                stuNum: req.body.stuNum,
                school: req.body.school
            })
            Log.save();
        }
        else if (req.body.apiName === "MODIFYPW") {
            const Log = new UserLog({
                apiName: req.body.apiName,
                description: req.body.description,
                id: req.body.id,
                pw: req.body.pw,
            })
            Log.save();
        }
        else if (req.body.apiName === "LOGIN") {
            const Log = new UserLog({
                apiName: req.body.apiName,
                description: req.body.description,
                id: req.body.id,
                loginSuccess: true,
            })
            Log.save();
        }
    })
    .then(() => {
        UserLog.find((error, data) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(data);
            }
        })
    })
    .catch((error) => {
        console.log(error);
    })
})

module.exports = router;