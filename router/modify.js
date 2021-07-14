const router = require('express').Router();
const fetch = require('node-fetch')
const { Client } = require('pg');
const jwt = require('jsonwebtoken')

const secretKey = "LOVETHEWAYYOUMOVEFUNKOVERLOAD";
const sql = "UPDATE member.info SET (name, email, phone, address, stunum, school, time) = " +
            "($1, $2, $3, $4, $5, $6, $7) WHERE id = $8";
const client = new Client({
    user: 'stageus',
    host: 'localhost',
    database: 'member',
    password: '1234',
    port: 5432,
});
client.connect();

router.post('/getInfo', (req, res) => {
    const result = {
        "name": "",
        "email": "",
        "phone": "",
        "address": "",
        "stuNum" : "",
        "school" : ""
    };
    jwt.verify(req.headers.auth, secretKey, (err, decoded) => {
        result.name = decoded.name;
        result.email = decoded.email;
        result.phone = decoded.phone;
        result.address = decoded.address;
        result.stuNum = decoded.stuNum;
        result.school = decoded.school;
    })

    res.send(result);
});

router.post('', (req, res) => {
    let user_id = "";
    jwt.verify(req.headers.auth, secretKey, (err, decoded) => {
        user_id = decoded.id;
    })

    fetch("https://" + req.hostname + ":9443/recordLog", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            apiName: "MODIFY",
            description: "Modify user information without password",
            id: user_id,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            stuNum: req.body.stuNum,
            school: req.body.school
        })
    })
    .then((response) => response.json())
    .catch((e) => {
        console.log(e);
    });

    const currentTime = new Date();
    const koreaTime = new Date(currentTime.getTime() + (9 * 60 * 60 * 1000));
    const modifyResult = {
        "success": true,
    }
    const value = [req.body.name,
        req.body.email,
        req.body.phone,
        req.body.address,
        req.body.stuNum,
        req.body.school,
        koreaTime,
        user_id];

    client.query(sql, value);
    res.send(modifyResult);
})

module.exports = router;