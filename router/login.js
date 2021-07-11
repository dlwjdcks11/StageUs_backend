const router = require('express').Router();
const fetch = require('node-fetch');
const { Client } = require('pg');

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
                res.cookie('login', 'logined', { maxAge: 60 * 1000 });
            }
        })

        if (loginResult.success) {
            fetch("https://" + req.hostname + ":9443/recordLog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    apiName: "LOGIN",
                    description: "Login success",
                    id: req.body.id,
                    loginSuccess: true,
                })
            })
            .then((response) => response.json())
            .catch((e) => {
                console.log(e);
            });
        }
        else {
            fetch("https://" + req.hostname + ":9443/recordLog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    apiName: "LOGIN",
                    description: "Login failed",
                    id: req.body.id,
                    loginSuccess: false,
                })
            })
            .then((response) => response.json())
            .catch((e) => {
                console.log(e);
            });
        }

        res.send(loginResult);
    })
});

module.exports = router;