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
    if (req.session.is_logined) return true;
    else return false;
}

function authStatusUI(req) {
    var login = '<a href = "/login">login</a>';
    if (authIsOwner(req)) {
        login = '<a href="/logout_process">logout</a>'
    } return login;
} // login context change

module.exports = {
    login : (req, res) => {
        var context = {
            menu: 'menuForGuest.ejs',
            who: '손님',
            body: 'login.ejs',
            logined: 'NO'
        };
        req.app.render('home', context, (err, html) => {
            res.end(html);
        })
    },


    login_process : (req, res) => {
        var post = req.body;
        db.query(
            'select count(*) as num from person where loginid = ? and password = ?',
            [post.id, post.pwd],
            (error, results) => {
                if (results[0].num === 1) {
                    db.query('select name, class from person where loginid = ? and password = ?',
                    [post.id, post.pwd],
                    (error, result) => {
                        req.session.is_logined = true;
                        req.session.name = result[0].name
                        req.session.class = result[0].class
                        res.redirect('/');
                    })
                } else {
                    req.session.is_logined = false;
                    req.session.name = '손님';
                    req.session.class = '99';
                    res.redirect('/');
                }
            }
        )
    },
    logout_process: (req, res) => {
        req
            .session
            .destroy((err) => {
                res.redirect('/');
            })
    }
}