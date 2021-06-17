const express = require('express');
const path = require('path');
const cors = require('cors');
const main = require('./router/main');
const pageMove = require('./router/pageMove');
const info = require('./router/register');

const app = express(); // 객체 넣기
const port = 9000;

const corsOptions = {
    origin: '*',
    credentials: true,
    methods: ['POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.options('*', cors(corsOptions));
app.use(cors(corsOptions)); 

app.use('/', main);
app.use('/', pageMove);
app.use('/', info)

app.listen(port, (req, res) => {
    console.log(port + "포트로 서버 실행");
});