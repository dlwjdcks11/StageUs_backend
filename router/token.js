const secretKey = "LOVETHEWAYYOUMOVEFUNKOVERLOAD";
const router = require('express').Router()
const jwt = require('jsonwebtoken')

// 토큰 검증
router.post('', (req, res) => {
    const result = {
        "success": false,
        "message": "",
    }
    
    try {
        req.decoded = jwt.verify(req.headers.auth, secretKey); // base64 인코딩 결과와 토큰 복호화 같아야함
        result.success = true;
        res.send(result);
    }
    catch(e) {
        if (e.name == "TokenExpiredError") {
            result.message = "토큰이 만료되었습니다."
        }
        else {
            result.message = "토큰이 유효하지 않습니다."
        }
        res.send(result);
    }
})

module.exports = router;