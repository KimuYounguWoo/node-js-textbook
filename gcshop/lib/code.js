// 201935231 컴퓨터공학과 김용우

var qs = require('querystring');
// querystring module

const db = require('./db');
// db module

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
    view : (req, res) => {
        act = req.params.vu;
        var isOwner = authIsOwner(req, res);
        db.query('select * from code_tbl', (err, it) => {
            var context = {
                menu: 'menuForManager.ejs',
                who: req.session.name,
                body: `code.ejs`,
                logined: 'YES',
                lists: it,
                act: act
            }
            req.app.render('home', context, (err, html) => {
            res.end(html);
        })
        })
    },
}