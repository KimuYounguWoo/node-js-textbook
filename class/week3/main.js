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
var db = require('./lib/db');
const customer = require('./lib/customer');

// Topic Page
// app.get('/', (req, res) => {
//     topic.home(req, res);
// })

// app.get('/page/:pageId', (req, res) => {
//     topic.page(req, res);
// })

// app.get('/create', (req,res) => {
//     topic.create(req,res);
// })

// app.post('/create_process', (req,res) => {
//     topic.create_process(req,res);
// })

// app.get('/update/:pageId', (req,res) => {
//     topic.update(req,res);
// })

// app.post('/update_process', (req,res) => {
//     topic.update_process(req,res);
// })

// app.get('/delete/:pageId', (req, res) => {
//     topic.delete_process(req, res);
// })




// Author page
// app.get('/', (req, res) => {
//     author.home(req, res);
// })

// app.get('/page/:pageId', (req, res) => {
//     author.page(req, res);
// })

// app.get('/create', (req,res) => {
//     author.create(req,res);
// })

// app.post('/create_process', (req,res) => {
//     author.create_process(req,res);
// })

// app.get('/update/:pageId', (req,res) => {
//     author.update(req,res);
// })

// app.post('/update_process', (req,res) => {
//     author.update_process(req,res);
// })

// app.get('/delete/:pageId', (req, res) => {
//     author.delete_process(req, res);
// })

// app.get('/', (req, res) => {
//     author.home(req, res);
// })

// app.get('/page/:pageId', (req, res) => {
//     author.page(req, res);
// })

// app.get('/create', (req,res) => {
//     author.create(req,res);
// })

// app.post('/create_process', (req,res) => {
//     author.create_process(req,res);
// })

// app.get('/update/:pageId', (req,res) => {
//     author.update(req,res);
// })

// app.post('/update_process', (req,res) => {
//     author.update_process(req,res);
// })

// app.get('/delete/:pageId', (req, res) => {
//     author.delete_process(req, res);
// })




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
