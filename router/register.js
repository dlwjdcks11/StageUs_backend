const path = require('path');
const router = require('express').Router();
const { Client } = require('pg');
const recordLog = require('./recordLog')

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
    recordLog('UserName ' + req.body.id + ' has registered');
    const currentTime = new Date();
    const koreaTime = new Date(currentTime.getTime() + (9 * 60 * 60 * 1000));

    const value = [req.body.name,
        req.body.email,
        req.body.phone,
        req.body.address,
        req.body.stuNum,
        req.body.school,
        koreaTime,
        req.body.id,
        req.body.pw];

    client.query(sql1, value, (err, result) => {
        console.log(err, result);
    })

    res.sendFile(path.join(__dirname, '../index.html'));
});

module.exports = router;