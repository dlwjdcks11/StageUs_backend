const router = require('express').Router();
const redis = require('redis')
const client = redis.createClient();
const { Client } = require('pg');

const sql = "SELECT * FROM gameInfo.character;"
const dbClient = new Client({
    user: 'stageus',
    host: 'localhost',
    database: 'game',
    password: '1234',
    port: 5432,
});
dbClient.connect();

router.get('', (req, res) => {
    client.on("error", (e) => {
        console.log(e);
    })

    dbClient.query(sql, (e, qResult) => {
        client.hexists("character", "nickname", (err, value) => {
            if (value === 1) { // 이미 존재
                client.hgetall("character", (err2, value2) => {
                    const result = {
                        "nickname": value2.nickname,
                        "level": value2.level,
                        "exp": value2.exp,
                        "attack": value2.attack,
                        "gold": value2.gold
                    }

                    res.send(result);
                })
            }
            else { // 최초생성
                const result = {
                    "nickname": qResult.rows[0].nickname,
                    "level": qResult.rows[0].level,
                    "exp": qResult.rows[0].exp,
                    "attack": qResult.rows[0].attack,
                    "gold": qResult.rows[0].gold
                }
                client.hset("character", "nickname", result.nickname);
                client.hset("character", "level", result.level);
                client.hset("character", "exp", result.exp);
                client.hset("character", "attack", result.attack);
                client.hset("character", "gold", result.gold);
    
                res.send(result);
            }
        })
    });
})

module.exports = router;