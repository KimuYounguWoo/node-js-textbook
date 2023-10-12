// 201935231 컴퓨터공학과 김용우
var qs = require('querystring');
const db = require('./db');
var sanitizeHtml = require('sanitize-html');

module.exports = {
    home : (req,res) => {
        db.query('SELECT * FROM topic', (error, topics) => {
            var c = '<a href="/create">create</a>'
            var b = '<h2>Welcome</h2><p>Node.js Start Page</p>'
            var context = {
                title: 'Topic list',
                list: topics,
                control: c,
                body: b
            };
                req.app.render('home', context, (err, html)=> {
                    res.end(html)
                })
            });
        },
        page : (req,res) => {
            var id = req.params.pageId;
            db.query('SELECT * FROM topic', (error, topics) => {
                if( error ) {
                    throw error;
                }
                db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id = ${id}`
                ,(error2, topic) => {
                    if ( error2 ) {
                        throw error2;
                    }
                var c = `<a href="/create">create</a>&nbsp;&nbsp;<a href="/update/${id}">update</a>&nbsp;&nbsp; <a href="/delete/${id}" onclick='if(confirm("정말로 삭제하시겠습니까?")==false){ return false }'>delete</a>` 
                var b = `<h2>${topic[0].title}</h2><p>${topic[0].descrpt}</p><p>by ${topic[0].name}</p>`
                var context = {
                    title: "Topic detail",
                    list: topics,
                    control: c,
                    body: b
                };
                res.app.render('home', context, (err, html)=> {
                    res.end(html);
                })
        })
        });
        },
    create : (req, res) => {
        db.query(`SELECT * FROM topic`, (error, topics) => {
            if (error) {
                throw error;
            }
            db.query(`SELECT * FROM author`, (err, authors) => {
                var i = 0;
                var tag = '';
                while (i < authors.length) {
                    tag += `<option value="${authors[i].id}">${authors[i].name}</option>`;
                    i++;
                }
                var context = {
                    title: 'Topic Create',
                    list: topics,
                    control: `<a href="/create">create</a>`,
                    body: `<form action="/create_process" method="post">
                <p><input type="text" name="title" placeholder="title"></p>
                <p><textarea name="description" placeholder="description"></textarea></p>
                <p><select name="author">
                ${tag}
                </select></p>
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
            sTitle = sanitizeHtml(post.title)
            sDescrpt = sanitizeHtml(post.description)
            sAuthor = sanitizeHtml(post.author)
            db.query(`INSERT INTO topic (title, descrpt, created, author_id) VALUES(?, ?, NOW(),?)`,
            [sTitle, sDescrpt, sAuthor],
            (error, result) => {
                if (error) {
                    throw error;
                }
                res.redirect(`/page/${result.insertId}`)
                res.end();
            });
        });
    },
    update : (req, res) => {
        id = req.params.pageId;
        db.query('SELECT * FROM topic', (error, topics) => {
            if ( error ) {
                throw error;
            }
            db.query(`SELECT * FROM topic WHERE id=?`, [id], (error2, topic) => {
                if ( error2 ) {
                    throw error2;
                }
                db.query(`SELECT * FROM author`, (err, authors) => {
                    if ( err ) {
                        throw err;
                    }
                    var i = 0;
                    var tag = '';
                    while ( i < authors.length ) {
                        var selected = '';
                        if ( authors[i].id === (topic[0].author_id) ) {
                            selected = ' selected';
                        }
                        tag += `<option value="${authors[i].id}"${selected}>${authors[i].name}</option>`;
                        i++;
                    }
                    var context = {
                        title: 'Topic Update',
                        list: topics,
                        control: `<a href="/create">create</a> <a href="/update/${topic[0].id}">update</a>`,
                        body: `<form action="/update_process" method="post">
                        <input type="hidden" name="id" value="${topic[0].id}">
                        <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
                        <p><textarea name="description" placeholder="description">${topic[0].descrpt}</textarea></p>
                        <p><select name="author">
                        ${tag}
                        </select></p>
                        <p><input type="submit"></p>
                        </form>`
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
            db.query('UPDATE topic SET title=?, descrpt=?, author_id = ? WHERE id=?',
            [sTitle, sDescrpt, sAuthor, post.id],
            (error, result) => {
                res.writeHead(302, {Location: `/page/${post.id}`});
                res.end();
            });
        });
    },
    delete_process : (req, res) => {
        id = req.params.pageId;
        db.query('DELETE FROM topic WHERE id = ?',
        [id],
        (error, result) => {
            if( error ) {
                throw error;
            } res.writeHead(302, {Location: `/`});
            res.end();
        });
    },
}
