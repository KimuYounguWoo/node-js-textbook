const express = require('express');
const app = express();

var urlm = require('url');

app.get(
    '/',
    (req, res) => {
        var title = 'Welcome';
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
                <h2>${title}</h2>
                <p>
                    JavaScript (/ˈdʒɑːvəˌskrɪpt/[6]), often abbreviated as JS, is a high-level, dynamic, weakly typed, prototype-based, multi-paradigm, and interpreted programming language. Alongside HTML and CSS, JavaScript is one of the three core technologies of World Wide Web content production. It is used to make webpages interactive and provide online programs, including video games. The majority of websites employ it, and all modern web browsers support it without the need for plug-ins by means of a built-in JavaScript engine. Each of the many JavaScript engines represent a different implementation of JavaScript, all based on the ECMAScript specification, with some engines not supporting the spec fully, and with many engines supporting additional features beyond ECMA.
                </p>
            </body>
        </html>
        `;
        res.send(template);
    }
)

app.get(
    '/:id',
    (req, res) => {
        var id = req.params.id;
        var _url = req.url;
        var queryData = urlm.parse(_url, true).query;
        var title = id;
        var template = `
        <!doctype htnpml>
        <html>
            <head>
                <title>${title}</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1><a href="/?id=WEB">WEB</a></h1>
                <ol>
                    <li><a href="/HTML">HTML</a></li>
                    <li><a href="/CSS">CSS</a></li>
                    <li><a href="/JavaScript">JavaScript</a></li>
                </ol>
                <h2>${title}</h2>
                <p>
                    JavaScript (/ˈdʒɑːvəˌskrɪpt/[6]), often abbreviated as JS, is a high-level, dynamic, weakly typed, prototype-based, multi-paradigm, and interpreted programming language. Alongside HTML and CSS, JavaScript is one of the three core technologies of World Wide Web content production. It is used to make webpages interactive and provide online programs, including video games. The majority of websites employ it, and all modern web browsers support it without the need for plug-ins by means of a built-in JavaScript engine. Each of the many JavaScript engines represent a different implementation of JavaScript, all based on the ECMAScript specification, with some engines not supporting the spec fully, and with many engines supporting additional features beyond ECMA.
                </p>
            </body>
        </html>
        `;

        res.send(template);
    });
app.get(
    '/author',
    (req, res) => res.send('/author')
);
app.listen(3000, () => console.log('Example app listening on port 3000!'));




/*
app.get (
    path: '/',
    callback: (req, res) => {}
    if only one callback, {} -> return xxx;
)
*/