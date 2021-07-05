const router = require('express').Router();
const fetch = require('node-fetch')
const { Client } = require('pg');

const client = new Client({
    user: 'stageus',
    host: 'localhost',
    database: 'member',
    password: '1234',
    port: 5432,
});
client.connect();

const sql1 = "INSERT INTO member.info (name, email, phone, address, stunum, school, time, id, pw)" + 
            " VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);";

router.post('', (req, res) => {
    fetch("https://" + req.hostname + ":9443/recordLog", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            apiName: "REGISTER",
            description: "New user was registered",
            id: req.body.id,
            pw: req.body.pw,
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
    const registerResult = {
        "success": true,
    }
    
    const value = [req.body.name,
        req.body.email,
        req.body.phone,
        req.body.address,
        req.body.stuNum,
        req.body.school,
        koreaTime,
        req.body.id,
        req.body.pw];

    client.query(sql1, value)

    res.send(registerResult)
});

module.exports = router;