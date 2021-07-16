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

    client.del(req.body.name);
    result.success = true;
    res.send(result)
})

module.exports = router;