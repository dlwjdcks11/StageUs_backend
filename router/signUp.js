const router = require('express').Router();
const path = require('path');
const mongoose = require('mongoose');
const userSchema = require('./schema/userSchema');
const user = require('./schema/userSchema');

router.get('', (req, res) => {
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
        user.find((error, data) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(data);
            }
        })
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
    .catch((error) => {
        console.log(error);
    })
});

module.exports = router;