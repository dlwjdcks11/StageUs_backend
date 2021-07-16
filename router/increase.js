const router = require('express').Router();
const redis = require('redis');
const client = redis.createClient();

router.post('', (req, res) => {
    const result = { "success" : false };
    
    client.on("ready", () => {
        console.log("Redis ready");
    });

    client.on("error", (e) => {
        console.log(e);
        // try-catch의 대용. 이거 실행되면 프로그램 멈춤
    });

    client.exists(req.body.name, (err, value) => {
        if (value == 1) { // 이미 존재
            client.get(req.body.name, (err2, value2) => {
                result.success = true;
                client.set(req.body.name, parseInt(value2) + 1);
                res.send(result);
            })
        }
        else { // 최초생성
            result.success = true;
            client.set(req.body.name, 1);
            res.send(result);
        }
    })
})

module.exports = router;