// 201935231 컴퓨터공학과 김용우

var qs = require('querystring');
// querystring module

const db = require('./db');
// db module

var sanitizeHtml = require('sanitize-html');
// sanitize-html module

var cookie = require('cookie');
// cookie module

var createContext= '<a href="/create">create</a>&nbsp;&nbsp;';
function univContext(id) {
    return createContext + `<a href="/update/${id}">update</a>&nbsp;&nbsp;<a href="/delete/${id}" onclick='if(confirm("정말로 삭제하시겠습니까?")==false){ return false }'>delete</a>`;
} // Context Merge


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
            var context = {
                lg: login,
                title: 'Topic list',
                list: topics,
                control: createContext,
                body: '<h2>Welcome</h2><p>Node.js Start Page</p>'
            };
                req.app.render('home', context, (err, html)=> {
                    res.end(html)
                })
            });
        },

        page : (req,res) => {
            var login = authStatusUI(req);
            var id = req.params.pageId;
            db.query('SELECT * FROM topic', (error, topics) => {
                if ( error ) throw error;
                db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id = ${id}`,
                (error2, topic) => {
                    if ( error2 ) throw error2;
                    var context = {
                        lg: login,
                        title: "Topic detail",
                        list: topics,
                        control: univContext(id),
                        body: `<h2>${topic[0].title}</h2><p>${topic[0].descrpt}</p><p>by ${topic[0].name}</p>`
                    };
                    res.app.render('home', context, (err, html)=> {
                        res.end(html);
                    });
                });
            });
        },

    create : (req, res) => {
        var login = authStatusUI(req);
        db.query(`SELECT * FROM topic`, (error, topics) => {
            if (error) throw error;
            db.query(`SELECT * FROM author`, (err, authors) => {
                var i = 0;
                var tag = '';
                while (i < authors.length) {
                    tag += `<option value="${authors[i].id}">${authors[i].name}</option>`;
                    i++;
                }
                var context = {
                    lg: login,
                    title: 'Topic Create',
                    list: topics,
                    control: createContext,
                    body: `
                    <form action="/create_process" method="post">
                    <p><input type="text" name="title" placeholder="title"></p>
                    <p><textarea name="description" placeholder="description"></textarea></p>
                    <p><select name="author">${tag}</select></p>
                    <p><input type="submit"></p></form>`
                };
                req.app.render('home', context, (err, html) => {
                    res.end(html);
                });
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
            sTitle = sanitizeHtml(post.title);
            sDescrpt = sanitizeHtml(post.description);
            sAuthor = sanitizeHtml(post.author);
            if ( !authIsOwner(req) ) {
                res.write(`
                <script type="text/javascript">
                alert("ERROR :: Create is need to login");
                location.href = "/";
                </script>`);
            }
            else {
                db.query(`INSERT INTO topic (title, descrpt, created, author_id) VALUES(?, ?, NOW(),?)`,
                [sTitle, sDescrpt, sAuthor],
                (error, result) => {
                    if (error) throw error;
                    res.redirect(`/page/${result.insertId}`)
                    res.end();
                });
            }
        });
    },

    update : (req, res) => {
        var login = authStatusUI(req);
        id = req.params.pageId;
        db.query('SELECT * FROM topic', (error, topics) => {
            if ( error ) throw error;
            db.query(`SELECT * FROM topic WHERE id=?`, [id], (error2, topic) => {
                if ( error2 ) throw error2;
                db.query(`SELECT * FROM author`, (err, authors) => {
                    if ( err ) throw err;
                    var i = 0;
                    var tag = '';
                    while ( i < authors.length ) {
                        var selected = '';
                        if ( authors[i].id === (topic[0].author_id) ) selected = ' selected';
                        tag += `<option value="${authors[i].id}"${selected}>${authors[i].name}</option>`;
                        i++;
                    }
                    var context = {
                        lg: login,
                        title: 'Topic Update',
                        list: topics,
                        control: univContext(topic[0].id),
                        body: `
                        <form action="/update_process" method="post">
                        <input type="hidden" name="id" value="${topic[0].id}">
                        <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
                        <p><textarea name="description" placeholder="description">${topic[0].descrpt}</textarea></p>
                        <p><input type="submit"></p>
                        </form>
                        `
                    };
                    req.app.render('home', context, (err, html) => {
                        res.end(html);
                    });
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
            sTitle = sanitizeHtml(post.title)
            sDescrpt = sanitizeHtml(post.description)
            sAuthor = sanitizeHtml(post.author)
            if ( !authIsOwner(req) ) {
                res.write(`
                <script type="text/javascript">
                alert("ERROR :: Update is need to login");
                location.href = "/";
                </script>`);
            }
            else {
                db.query('UPDATE topic SET title=?, descrpt=?, author_id = ? WHERE id=?',
                [sTitle, sDescrpt, sAuthor, post.id],
                (error, result) => {
                    res.writeHead(302, {Location: `/page/${post.id}`});
                    res.end();
                });
            }

        });
    },
    
    delete_process : (req, res) => {
        id = req.params.pageId;
        if ( !authIsOwner(req) ) {
            res.write(`
            <script type="text/javascript">
            alert("ERROR :: Delete is need to login");
            location.href = "/";
            </script>`);
        }
        else {
            db.query('DELETE FROM topic WHERE id = ?',
            [id],
            (error, result) => {
                if( error ) throw error;
                res.writeHead(302, {Location: `/`});
                res.end();
            });
        }
    },

    login : (req, res) => {
        var login  = `<a href = "/login">login</a>`
        db.query('SELECT * FROM topic', (error, topics) => {
            var context = {
                lg: login,
                title: 'Login',
                list: topics,
                control: createContext,
                body: `
                    <form action = "/login_process" method = "post">
                    <p><input type="text" name \="email" placeholder="email" value="email"</p>
                    <p><input type="password" name="password" placeholder="password" value="password"</p>
                    <p><input type="submit"></p>
                    </form>
                    `
            };
            req.app.render('home', context, (err, html) => {
            res.end(html)
            })
        });
    },

    login_process : (req, res) => {
        var body = '';
        req.on('data', (data) => {
            body = body + data;
        });
        req.on('end', () => {
            var post = qs.parse(body);
            if (post.email === 'admin' && post.password === 'admin') {
                res.writeHead(302, {
                    'Set-Cookie': [
                        `email = ${post.email}`,
                        `password = ${post.password}`,
                        `nickame = admin`],
                        Location: `/`
                });
                res.end();
            }
            else {
                res.end(`
                <script type="text/javascript">
                alert("ERROR :: No Username or Password");
                location.href = "/";
                </script>`
                );
            }
        });
    },

    logout_process : (req, res) => {
            res.writeHead(302, {
                'Set-Cookie': [
                    `email=; Max-Age=0`,
                    `password=; Max-Age=0`,
                    `nickname=; Max-Age=0`
                ],
                Location: '/'
            });
            res.end();
    },
}
