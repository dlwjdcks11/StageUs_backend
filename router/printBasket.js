const router = require('express').Router();
const redis = require('redis');
const client = redis.createClient();

router.post('', (req, res) => {
    const result = { "basket" : null };
    
    client.on("ready", () => {
        console.log("Redis ready");
    });

    client.on("error", (e) => {
        console.log(e);
        // try-catch의 대용. 이거 실행되면 프로그램 멈춤
    });

    client.hgetall("mouse", (err, value) => {
        console.log(value)
        result.basket = value;
        res.send(result)
    })
    // client.hkeys(req.body.name, (err, value) => {
    //     result.basket = value;
    //     value.forEach((element) => {
    //         client.hget(req.body.name, element, (err2, value2) => {
                
    //         })
    //     })
    //     res.send(result);
    // })
})

module.exports = router;