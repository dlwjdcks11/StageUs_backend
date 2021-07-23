const router = require('express').Router();
const redis = require('redis')
const client = redis.createClient();

router.get('', (req, res) => {
    client.hgetall("character", (err, value) => {
        client.hmset("character", [
            "gold", String(parseInt(value.gold) - 10),
            "attack", String(parseInt(value.attack) + 2)
        ], () => {
            client.expire("character", 30, () => {
                const result = { 
                    message: "골드를 10 소모해, 공격력이 2 증가했습니다.",
                    gold: parseInt(value.gold) - 10,
                    attack: parseInt(value.attack) + 2,
                }
                res.send(result);
            });
        })
    })
})

module.exports = router;