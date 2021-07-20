const router = require('express').Router();
const redis = require('redis')
const client = redis.createClient();

router.get('', (req, res) => {
    client.hgetall("character", (err, value) => {
        client.hmset("character", [
            "exp", String(parseInt(value.exp) + 12),
            "gold", String(parseInt(value.gold) + 2)
        ], () => {
            client.expire("character", 90, () => {
                const result = { 
                    message: "경험치가 12, 골드가 2 증가했습니다.",
                    exp: parseInt(value.exp) + 12,
                    gold: parseInt(value.gold) + 2,
                }
                res.send(result);
            });
        })
    })
})

module.exports = router;