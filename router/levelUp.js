const router = require('express').Router();
const redis = require('redis')
const client = redis.createClient();

router.get('', (req, res) => {
    client.on("error", (e) => {
        console.log(e);
    })

    client.hgetall("character", (err, value) => {
        client.hset("character", "exp", String(parseInt(value.exp) - 100));
        client.hset("character", "level", String(parseInt(value.level) + 1));
        const result = { 
            message: "레벨업 했습니다.",
            exp: parseInt(value.exp) - 100,
            level: parseInt(value.level) + 1,
        }

        res.send(result);
    })
})

module.exports = router;