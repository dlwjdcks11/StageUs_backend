const router = require('express').Router();
const redis = require('redis')
const client = redis.createClient();

router.get('', (req, res) => {
    client.on("error", (e) => {
        console.log(e);
    })

    client.hgetall("character", (err, value) => {
        client.hset("character", "gold", String(parseInt(value.gold) - 12));
        client.hset("character", "attack", String(parseInt(value.attack) + 2));
        const result = { 
            message: "골드를 10 소모해, 공격력이 2 증가했습니다.",
            gold: parseInt(value.gold) - 10,
            attack: parseInt(value.attack) + 2,
        }

        res.send(result);
    })
})

module.exports = router;