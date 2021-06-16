const path = require('path');
const router = require('express').Router();

router.get('/login', (req, res) => {
    let id = req.body.id;
    let pw = req.body.pw;

    const result = {
        "success": false,
    }

    if (id === "stageus" && pw === "1234") {
        result.success = true;
    } 
    else {
        result.success = false;
    }

    res.send(result);
});
// get: 서버에서 값을 가져오기만 하겠다.
// post: 클라이언트가 값을 보내준다.

module.exports = router;