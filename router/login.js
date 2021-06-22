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

const sql = "SELECT id, pw FROM member.info;"
    
router.post('', (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;
    const loginResult = {
        "success": false,
    }

    client.query(sql, (err, result) => {
        const queryResult = result.rows;
        queryResult.forEach(element => {
            if (element.id === id && element.pw === pw) {
                loginResult.success = true;

                req.session.user_id = element.id;
            }
        })
        res.send(loginResult);
    })
});
// get: 서버에서 값을 가져오기만 하겠다.
// post: 클라이언트가 값을 보내준다.

module.exports = router;