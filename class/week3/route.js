// 201935231 컴퓨터공학과 김용우


// ====================== EXPRESS & EJS ======================
const express = require('express');
const app = express();
// Node.js Express 모듈

app.set('views', __dirname + '/views');
// EJS 파일 위치 설정

app.set('view engine', 'ejs');
// EJS 설정


// ====================== 사용자 정의 모듈 ======================
var db = require('./lib/db');
// DB 모듈

var rootRouter = require('./router/rootRouter');

var authorRouter = require('./router/authorRouter');


// ====================== SESSION, STORE ======================
var session = require('express-session');
// 세션 모듈

var MySqlStore = require('express-mysql-session')(session);
// express session과 mysql을 연결해주는 모듈
// express-session을 인자로 받아야 함.

var options = {
    host: 'localhost',
    user : 'root',
    password : 'root',
    database : 'webdb2023'
};
// DB 옵션

var sessionStore = new MySqlStore(options);
// DB 정보를 인자로 받아, 세션 저장소 객체를 생성

app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : true,
    store : sessionStore
}));
// 세션 옵션

var bodyParaser = require('body-parser');
app.use(bodyParaser.urlencoded( {extended: false} ));

app.use('/', rootRouter);
app.use('/author', authorRouter);

app.listen(3000);
