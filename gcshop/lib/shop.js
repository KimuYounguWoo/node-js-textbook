
// 201935231 컴퓨터공학과 김용우
function checkManager(req) {
    if (req.session.class === '00') return 'MANAGER';
    else if (req.session.class === '01') return 'ADMIN';
    else if (req.session.class === '02') return 'USER';
    else return 'NO';
} // Class Check Function

function authIsOwner(req, res) {
    if (req.session.is_logined) {
        return true;
    } else {
        return false
    }
}
const db = require('./db');
// db module

module.exports = {
    home : (req, res) => {
        var isOwner = authIsOwner(req, res);
        db.query('select * from boardtype', (errs, types) => {
        db.query("SELECT * FROM MERCHANDISE", (err, li) => {
            if (isOwner) {
                if (req.session.class === '00') {
                    var context = {
                        menu: 'menuForManager.ejs',
                        who: req.session.name,
                        body: 'merchandise.ejs',
                        lists: li,
                        logined: checkManager(req),
                        act: 'v',
                        boardtypes: types
                    };
                } else if (req.session.class === '01') {
                    var context = {
                        menu: 'menuForManager.ejs',
                        who: req.session.name,
                        body: 'merchandise.ejs',
                        lists: li,
                        logined: checkManager(req),
                        act: 'v',
                        boardtypes: types
                    };
                } else if (req.session.class === '02') {
                    var context = {
                        menu: 'menuForCustomer.ejs',
                        who: req.session.name,
                        body: 'merchandise.ejs',
                        lists: li,
                        logined: checkManager(req),
                        act: 'v',
                        boardtypes: types
                    };
                }
            } else {
                var context = {
                    menu: 'menuForCustomer.ejs',
                    who: '손님',
                    body: 'merchandise.ejs',
                    lists: li,
                    logined: checkManager(req),
                    act: 'v',
                    boardtypes: types
                };
            }
            req.app.render('home', context, (err, html) => {
            res.end(html);
        })
        })
    })
},
}