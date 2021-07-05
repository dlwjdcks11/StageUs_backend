const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const main = require('./router/main');
const pageMove = require('./router/pageMove');
const inputInfo = require('./router/register');
const login = require('./router/login');
const moveToMain = require('./router/moveToMain');
const moveToPwChange = require('./router/moveToPwChange');
const modify = require('./router/modify');
const modifyPw = require('./router/modifyPw');
const recordLog = require('./router/recordLog');
const https = require('https');
const fs = require('fs');

const app = express(); // 객체 넣기
const port = 9000;
const httpsPort = 9443; // http: 80번, SSH: 22번, https: 443번
const options = {
    key: fs.readFileSync(path.join(__dirname, 'private.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'public.pem')),
} // 유료는 ca(보안명세서)가 붙는다.

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//Node.js 환경에서 https/SSL/TLS 검사를 비활성화한다.

const corsOptions = {
    origin: '*',
    credentials: true,
    methods: ['POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.options('*', cors(corsOptions));
app.use(cors(corsOptions)); 

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())

app.get('*', (req, res, next) => {
    const protocol = req.protocol;

    if (protocol == 'https') {
        next(); // 그냥 넘기겠다.
    }
    else {
        const destination = "https://" + req.hostname + ":9443" + req.url;
        res.redirect(destination);
    }
})

app.use(session({
    secret: 'mykey',
    saveUninitialized: true,
    resave: false
}));

app.use('/recordLog', recordLog);
app.use('/modifyPw', modifyPw);
app.use('/pwChange', moveToPwChange);
app.use('/modifyInfo', modify);
app.use('/login', login);
app.use('/inputInfo', inputInfo);
app.use('/modify', moveToMain);
app.use('/register', pageMove);
app.use('/', main);

app.listen(port, (req, res) => {
    console.log(port + "포트로 서버 실행");
});

https.createServer(options, app).listen(httpsPort, (req, res) => {
    console.log("HTTPS 서버가 " + httpsPort + "포트로 서버 실행");
}) // options에 key가 들어간다.