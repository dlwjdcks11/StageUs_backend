const express = require('express');
const path = require('path');
const main = require('./router/main');

const app = express(); // 객체 넣기
const port = 9000;

app.use('/', main);

app.listen(port, (req, res) => {
    console.log(port + "포트로 서버 실행");
});