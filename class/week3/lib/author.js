// 201935231 컴퓨터공학과 김용우
var qs = require('querystring');
// querystring module

const db = require('./db');
// db module

var sanitizeHtml = require('sanitize-html');
// sanitize-html module

var cookie = require('cookie');
// cookie module


function authIsOwner(req) {
    var isOwner = false;
    var cookies = {};
    if ( req.headers.cookie ) {
        cookies = cookie.parse(req.headers.cookie);
    }
    if ( cookies.email === 'admin' && cookies.password === 'admin' ) {
        isOwner = true;
    }
    return isOwner;
} // Check cookie -> this user is alright?

function authStatusUI(req) {
    var login = '<a href = "/login">login</a>';
    if (authIsOwner(req)) {
        login = '<a href="/logout_process">logout</a>'
    } return login;
} // login context change

module.exports = {
    home : (req,res) => {
        var login = authStatusUI(req);
        db.query('SELECT * FROM topic', (error, topics) => {
            db.query('SELECT * FROM author', (err, authors) => {
                var i = 0;
                var tag = '<table border = "1" style="border-collapse: collapse;">'
                while ( i < authors.length ) {
                    tag = tag + `
                    <tr>
                    <td>${authors[i].name}</td>
                    <td>${authors[i].profile}</td>
                    <td><a href="/author/update/${authors[i].id}">update</a></td>
                    <td><a href="/author/delete/${authors[i].id}">delete</a></td>
                    </tr>
                    `
                    i += 1;
                }
                tag = tag + '</table>'
                var b = `
                <form action="/author/create_process" method="post">
                <p><input type = "text" name = "name" placeholder = "name"></p>
                <p><input type = "text" name = "profile" placeholder = "profile"></p>
                <p><input type = "submit" value ="생성"></p>
                </form>
                `
                var context = {
                    lg: login,
                    title: 'Author list',
                    list: topics,
                    control: tag,
                    body: b
                };
                req.app.render('home', context, (err, html) => {
                    res.end(html)
                })
            });
        });
    },
    create_process : (req, res) => {
        var body = '';
        req.on('data', (data) => {
            body = body + data;
        });
        req.on('end', () => {
            var post = qs.parse(body);
            sName = sanitizeHtml(post.name)
            sProfile = sanitizeHtml(post.profile)
            if ( !authIsOwner(req) ) {
                res.write(`
                <script type="text/javascript">
                alert("ERROR :: Create is need to login");
                location.href = "/";
                </script>`);
            }
            else {
                db.query(
                    `INSERT INTO author (name, profile) VALUES(?, ?)`,
                    [sName, sProfile],
                    (error, result) => {
                        if (error) {
                            throw error;
                        }
                        res.redirect(`/author`)
                        res.end();
                });
            }
        });
    },
    update : (req,res) => {
        var login = authStatusUI(req);
        id = req.params.id;
        db.query('SELECT * FROM topic', (error, topics) => {
            db.query('SELECT * FROM author', (err, authors) => {
                var i = 0;
                var tag = '<table border = "1" style="border-collapse: collapse;">'
                while ( i < authors.length ) {
                    tag = tag + `
                    <tr>
                    <td>${authors[i].name}</td>
                    <td>${authors[i].profile}</td>
                    <td><a href="/author/update/${authors[i].id}">update</a></td>
                    <td><a href="/author/delete/${authors[i].id}">delete</a></td>
                    </tr>
                    `
                    i += 1;
                }
                db.query('SELECT * FROM author WHERE id = ?',
                [id],
                (err, author) => {
                tag = tag + '</table>'
                var b = `
                <form action="/author/update_process" method="post">
                <p><input type = "hidden" name = "id" value = "${id}"</p>
                <p><input type = "text" name = "name" placeholder = "${author[0].name}"></p>
                <p><input type = "text" name = "profile" placeholder = "${author[0].profile}"></p>
                <p><input type = "submit" value ="갱신"></p>
                </form>
                `
                var context = {
                    lg: login,
                    title: 'Author list - Update',
                    list: topics,
                    control: tag,
                    body: b
                };
                req.app.render('home', context, (err, html) => {
                    res.end(html)
                })
            });
            });
        });
    },
    update_process : (req, res) => {
        var body = '';
        req.on('data', (data) => {
            body = body + data;
        });
        req.on('end', () => {
            var post = qs.parse(body);
            sName = sanitizeHtml(post.name)
            sProfile = sanitizeHtml(post.profile)
            if ( !authIsOwner(req) ) {
                res.write(`
                <script type="text/javascript">
                alert("ERROR :: Update is need to login");
                location.href = "/";
                </script>`);
            }
            else {
                db.query(
                    `UPDATE author SET name = ?, profile = ? WHERE id = ?`,
                    [sName, sProfile, post.id],
                    (error, result) => {
                        res.redirect(`/author`)
                        res.end();
                });
            }
        });
    },
    delete_process : (req, res) => {
        id = req.params.id; // Author id
        a = "삭제 가능";
        b = "삭제 불가능";
        if ( !authIsOwner(req) ) {
            res.write(`
            <script type="text/javascript">
            alert("ERROR :: Delete is need to login");
            location.href = "/";
            </script>`);
        }
        else {
            db.query(`SELECT * FROM topic WHERE author_id = ${id}`, (error, topic) => { // topic이 없으면
                if ( error ) {
                    throw error;
                }
                if ( topic.length === 0 ) {
                    db.query('DELETE FROM author WHERE id = ?',
                    [id],
                    (error, result) => {
                    if( error ) {
                        throw error;
                    }
                    res.writeHead(302, {Location: `/author`});
                    res.end();
                });
                }
                else {
                    res.send(`<script>alert("삭제 불가능")</script>`)
                    res.redirect(`/author`)
                }
                res.writeHead(302, {Location: `/author`});
                res.end();
                });
        }
    },
}