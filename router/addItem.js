const router = require('express').Router();
const redis = require('redis');
const client = redis.createClient();

router.post('', (req, res) => {
    const result = { "message" : null };
    
    client.on("ready", () => {
        console.log("Redis ready");
    });

    client.on("error", (e) => {
        console.log(e);
        // try-catch의 대용. 이거 실행되면 프로그램 멈춤
    });

    client.hexists(req.body.name, req.body.item, (err, value) => {
        if (value === 1) { // 이미 존재
            client.hget(req.body.name, req.body.item, (err2, value2) => {
                client.hset(req.body.name, req.body.item, parseInt(value2) + 1)
                result.message = req.body.item + "의 개수: " + String(parseInt(value2) + 1);
                res.send(result);
            })
        }
        else { // 최초생성
            client.hset(req.body.name, req.body.item, 1)
            result.message = req.body.item + "의 개수: " + String(1);
            res.send(result);
        }
    })
})

module.exports = router;