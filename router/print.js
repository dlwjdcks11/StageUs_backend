const router = require('express').Router();
const redis = require('redis');
const client = redis.createClient();

router.post('', (req, res) => {
    const result = { "number" : null };
    
    client.on("ready", () => {
        console.log("Redis ready");
    });

    client.on("error", (e) => {
        console.log(e);
        // try-catch의 대용. 이거 실행되면 프로그램 멈춤
    });

    client.get(req.body.name, (err, value) => {
        result.number = value;
        res.send(result);
    })
})

module.exports = router;