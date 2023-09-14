var http = require('http');
var fs = require('fs');
var urlm = require('url')

var app = http.createServer(function(req,res){
    var _url = req.url;
    var queryData = urlm.parse(_url, true).query;
    var title = queryData.id;

    if (res.url = '/') {
        title = 'Welcome';
    }

    if (res.url == '/favicon.ico') {
        return res.writeHead(404);
    }

    res.writeHead(200);
    var template = `
    <!doctype html>
    <html>
        <head>
            <title>${title}</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/?id=WEB">WEB</a></h1>
            <ol>
                <li><a href="/?id=HTML">HTML</a></li>
                <li><a href="/?id=CSS">CSS</a></li>
                <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ol>
            <h2>${queryData.id}</h2>
            <p>
                JavaScript (/ˈdʒɑːvəˌskrɪpt/[6]), often abbreviated as JS, is a high-level, dynamic, weakly typed, prototype-based, multi-paradigm, and interpreted programming language. Alongside HTML and CSS, JavaScript is one of the three core technologies of World Wide Web content production. It is used to make webpages interactive and provide online programs, including video games. The majority of websites employ it, and all modern web browsers support it without the need for plug-ins by means of a built-in JavaScript engine. Each of the many JavaScript engines represent a different implementation of JavaScript, all based on the ECMAScript specification, with some engines not supporting the spec fully, and with many engines supporting additional features beyond ECMA.
            </p>
        </body>
    </html>`;
    res.end(template);
});
app.listen(3000);