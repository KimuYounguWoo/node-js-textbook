// 201935231 컴퓨터공학과 김용우

const express = require('express');
const app = express();
// express setting

app.set('views', __dirname + '/views');
// ejs file path setting

app.set('view engine', 'ejs');
// ejs setting

var customer = require('./lib/customer');

// Customer page
app.get('/', (req, res) => {
    customer.home(req, res);
})

app.get('/page/:pageId', (req, res) => {
    customer.page(req, res);
})

app.get('/create', (req,res) => {
    customer.create(req,res);
})

app.post('/create_process', (req,res) => {
    customer.create_process(req,res);
})

app.get('/update/:pageId', (req,res) => {
    customer.update(req,res);
})

app.post('/update_process', (req,res) => {
    customer.update_process(req,res);
})

app.get('/delete/:pageId', (req, res) => {
    customer.delete_process(req, res);
})


app.listen(3000);
