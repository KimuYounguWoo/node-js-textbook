// 201935231 컴퓨터공학과 김용우

const express = require('express');
const app = express();
// Node.js Express 모듈

app.set('views', __dirname + '/views');
// EJS 파일 위치 설정

app.set('view engine', 'ejs');
// EJS 설정

var cookie = require('cookie');
// 쿠키 모듈

var topic = require('./lib/topic');
// topic 모듈

var author = require('./lib/author');
// author 모듈


// ====================== login Page ======================
app.get('/login', (req, res) => {
    topic.login(req, res);
}) // login page

app.post('/login_process', (req, res) => {
    topic.login_process(req, res);
}) // login process

app.get('/logout_process', (req, res) => {
    topic.logout_process(req, res);
}) // logout process

// ====================== Topic Page ======================
app.get('/', (req, res) => {
    topic.home(req, res);
}) // home page


app.get('/page/:pageId', (req, res) => {
    topic.page(req, res);
})  // page

app.get('/create', (req,res) => {
    topic.create(req,res);
}) // create

app.post('/create_process', (req,res) => {
    topic.create_process(req,res);
}) // create process

app.get('/update/:pageId', (req,res) => {
    topic.update(req,res);
}) // update

app.post('/update_process', (req,res) => {
    topic.update_process(req,res);
}) // update process

app.get('/delete/:pageId', (req, res) => {
    topic.delete_process(req, res);
}) // delete process

// ====================== Author Page ======================
app.get('/author', (req, res) => {
    author.home(req, res);
}) // author home

app.post('/author/create_process', (req, res) => {
    author.create_process(req, res);
}) // author create process

app.get('/author/update/:id', (req,res) => {
    author.update(req,res);
}) // author update

app.post('/author/update_process', (req, res) => {
    author.update_process(req, res);
}) // author update process

app.get('/author/delete/:id', (req, res) => {
    author.delete_process(req, res);
}) // author delete process


app.listen(3000);
