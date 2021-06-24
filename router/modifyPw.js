const path = require('path');
const router = require('express').Router();
const { Client } = require('pg');
const recordLog = require('./recordLog');

const client = new Client({
    user: 'stageus',
    host: 'localhost',
    database: 'member',
    password: '1234',
    port: 5432,
});
client.connect();

const sql = "UPDATE member.info SET (pw, time) = ($1, $2) WHERE id = $3";

router.post('', (req, res) => {
    recordLog('UserName ' + req.session.user_id + ' has modified password')
    const currentTime = new Date();
    const koreaTime = new Date(currentTime.getTime() + (9 * 60 * 60 * 1000));

    const value = [req.body.pw,
        koreaTime,
        req.session.user_id];
        
    client.query(sql, value, (err, result) => {
        console.log(result);
    })
    res.redirect('/');
})

module.exports = router;