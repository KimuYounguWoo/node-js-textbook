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
    home : (req, res) => {
        var isOwner = authIsOwner(req, res);
        if (isOwner) {
            if (req.session.class === '00') {
                var context = {
                    menu: 'menuForManager.ejs',
                    who: req.session.name,
                    body: 'items.ejs'
                };
            } else if (req.session.class === '01') {
                var context = {
                    menu: 'menuForCustomer.ejs',
                    who: req.session.name,
                    body: 'items.ejs'
                };
            } else if (req.session.class === '02') {
                var context = {
                    menu: 'menuForCustomer.ejs',
                    who: req.session.name,
                    body: 'items.ejs',
                    logined: 'YES'
                };
            }
        } else {
            var context = {
                menu: 'menuForGuest.ejs',
                who: '손님',
                body: 'items.ejs',
                logined: 'NO'
            };
        }
        req.app.render('home', context, (err, html) => {
        res.end(html);
    })
}
}