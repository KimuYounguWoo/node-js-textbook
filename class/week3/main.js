const express = require('express');
const app = express();
// express setting

app.set('views', __dirname + '/views');
// ejs file path setting

app.set('view engine', 'ejs');
// ejs setting


var urlm = require('url');
// url mapping module

var db = require('./lib/db');
var topic = require('./lib/topic');


app.get('/', (req, res) => {
    topic.home(req, res);
    }
)

app.get('/test', (req, res) => {
    topic.test(req, res);
}
)

app.get(
    '/favicon.ico',
    (req, res) => res.send('/author')
);
app.listen(3000, () => console.log('Example app listening on port 3000!'));
