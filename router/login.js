const router = require('express').Router();
const fetch = require('node-fetch');
const { Client } = require('pg');
const jwt = require('jsonwebtoken')

const secretKey = "LOVETHEWAYYOUMOVEFUNKOVERLOAD";
const sql = "SELECT * FROM member.info;"
const client = new Client({
    user: 'stageus',
    host: 'localhost',
    database: 'member',
    password: '1234',
    port: 5432,
});
client.connect();    

router.post('', (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;
    const loginResult = {
        "success": false,
        "token": null,
    }

    client.query(sql, (err, result) => {
        const queryResult = result.rows;
        queryResult.forEach(element => {
            if (element.id === id && element.pw === pw) {
                // 토큰 생성
                const jwtToken = jwt.sign({
                    id: element.id,
                    name: element.name,
                    email: element.email,
                    phone: element.phone,
                    address: element.address,
                    stuNum: element.stunum,
                    school: element.school
                }, secretKey, {
                    expiresIn: "1m",
                    issuer: "stageus"
                })
                loginResult.success = true;
                loginResult.token = jwtToken;
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