const router = require('express').Router();
const redis = require('redis')
const client = redis.createClient();
const { Client } = require('pg');

const sql = "UPDATE gameInfo.character SET (level, exp, attack, gold) = ($1, $2, $3, $4) WHERE nickname = $5";
const dbClient = new Client({
    user: 'stageus',
    host: 'localhost',
    database: 'game',
    password: '1234',
    port: 5432,
});
dbClient.connect();

router.get('', (req, res) => {
    client.hgetall("character", (err, value) => {
        const values = [parseInt(value.level), parseInt(value.exp), parseInt(value.attack), parseInt(value.gold), value.nickname];
        dbClient.query(sql, values, () => {
            const result = { "message": "자동저장 되었습니다." };
            res.send(result);
        });
    })
})

module.exports = router;