const secretKey = "LOVETHEWAYYOUMOVEFUNKOVERLOAD";
const router = require('express').Router()
const jwt = require('jsonwebtoken')

// 토큰 생성
// router.post('', (req, res) => {
//     const id = req.body.id;
//     const pw = req.body.pw;

//     try {
//         if (id == "stageus" && pw == "1234") {
//             const userId = id;
//             const userName = "LJC";
//             const userEmail = "aaa@naver.com";
//             const jwtToken = jwt.sign({
//                 id: userId,
//                 name: userName,
//                 email: userEmail,
//             }, secretKey, {
//                 expiresIn: "1m",
//                 issuer: "stageus"
//             })
//             const result = {
//                 "success": true,
//                 "message": "토큰이 발급되었습니다.",
//                 "token": jwtToken
//             }
//             res.send(result);
//         }
//         else {
//             const result = {
//                 "success": false,
//                 "message": "회원 정보가 잘못되었습니다..",
//             }
//             res.send(result);
//         }
//     }
//     catch(e) {
//         console.log(e);
//         const result = {
//             "success": false,
//             "message": "서버 문제로 토큰 발급에 실패했습니다..",
//         }
//         res.send(result);
//     }
// })

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