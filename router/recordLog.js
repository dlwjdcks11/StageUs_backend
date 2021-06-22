const path = require('path');
const mongoose = require('mongoose');
const log = require('./schema/logSchema');
const logSchema = require('./schema/logSchema')

const recordLog = (_name) => {
    mongoose.connect(
        "mongodb+srv://stageus:1234@cluster0.bqzef.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        } // 옵션 꼭 필요, 비동기 통신
    )
    .then(() => {
        const Log = new log({
            name: _name,
        })
        Log.save((error, data) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log("is saved");
            }
        });
    })
    .then(() => {
        log.find((error, data) => {
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
    // .then(() => {
    //     console.log("Mong-ha!");
    //     // json 스키마 필요
    //     const User = new user({
    //         id: "stageus",
    //         pw: "1234"
    //     })
    //     User.save((error, data) => {
    //         if (error) {
    //             console.log(error);
    //         }
    //         else {
    //             console.log("is saved");
    //         }
    //     })
    // })
}

module.exports = recordLog;