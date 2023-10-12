// 201935231 컴퓨터공학과 김용우

const express = require('express');
const app = express();
// express setting

app.set('views', __dirname + '/views');
// ejs file path setting

app.set('view engine', 'ejs');
// ejs setting

var topic = require('./lib/topic');
var author = require('./lib/author');

// ====================== Topic Page ======================
app.get('/', (req, res) => {
    topic.home(req, res);
})

app.get('/page/:pageId', (req, res) => {
    topic.page(req, res);
})

app.get('/create', (req,res) => {
    topic.create(req,res);
})

app.post('/create_process', (req,res) => {
    topic.create_process(req,res);
})

app.get('/update/:pageId', (req,res) => {
    topic.update(req,res);
})

app.post('/update_process', (req,res) => {
    topic.update_process(req,res);
})

app.get('/delete/:pageId', (req, res) => {
    topic.delete_process(req, res);
})

// ====================== Author Page ======================
app.get('/author', (req, res) => {
    author.home(req, res);
})

app.post('/author/create_process', (req, res) => {
    author.create_process(req, res);
})

app.get('/author/update/:id', (req,res) => {
    author.update(req,res);
})

app.post('/author/update_process', (req, res) => {
    author.update_process(req, res);
})

app.get('/author/delete/:id', (req, res) => {
    author.delete_process(req, res);
})


app.listen(3000);
