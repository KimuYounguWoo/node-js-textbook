// 201935231 컴퓨터공학과 김용우

// ====================== EXPRESS & EJS (VIEW) ======================
const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// ====================== MODULE IMPORT ======================
// 1. Customized Module
var db = require('./lib/db');

// 2. Session
var session = require('express-session');
var MySqlStore = require('express-mysql-session')(session);

var options = {
    host: 'localhost',
    user : 'root',
    password : 'root',
    database : 'webdb2023'
};
// 3. Session Store
var sessionStore = new MySqlStore(options);

// 4. Body-Parser
var bodyParaser = require('body-parser');

// 5. Router
var rootRouter = require('./router/rootRouter');
var authRouter = require('./router/authRouter');
var codeRouter = require('./router/codeRouter');
var merchandiseRouter = require('./router/merchandiseRouter')
// var personRouter = require('./router/personRouter');

// ====================== SESSION, STORE ======================
app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : true,
    store : sessionStore
}));

// ====================== BODY-PARSER ======================
app.use(bodyParaser.urlencoded( {extended: false} ));

// ====================== ROUTE ======================
app.use('/', rootRouter);
app.use('/auth', authRouter);
app.use('/merchandise',merchandiseRouter);
app.use('/code', codeRouter);
// app.use('/person',personRouter);
// ====================== STATIC =====================
app.use(express.static('public'));

// ====================== START ======================
app.listen(3000);
