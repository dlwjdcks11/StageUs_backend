const path = require('path');
const router = require('express').Router();
const { Client } = require('pg');

const client = new Client({
    user: 'stageus',
    host: 'localhost',
    database: 'member',
    password: '1234',
    port: 5432,
});
client.connect();

const sql1 = "SELECT * FROM member.info WHERE id = $1";
const sql2 = "UPDATE member.info SET (name, email, phone, address, stunum, school, time) = " +
            "($1, $2, $3, $4, $5, $6, $7) WHERE id = $8";

router.get('', (req, res) => {
    const value = [req.session.user_id];
    client.query(sql1, value, (err, result) => {
        const queryResult = {
            "name": result.rows[0].name,
            "email": result.rows[0].email,
            "phone": result.rows[0].phone,
            "address": result.rows[0].address,
            "stuNum" : result.rows[0].stunum,
            "school" : result.rows[0].school
        }
        res.send(queryResult);
    })
});

router.post('', (req, res) => {
    const value = [req.body.name,
        req.body.email,
        req.body.phone,
        req.body.address,
        req.body.stuNum,
        req.body.school,
        new Date(),
        req.session.user_id];
    client.query(sql2, value, (err, result) => {
        console.log(result);
    })
    res.sendFile(path.join(__dirname, '../index.html'));
})

module.exports = router;