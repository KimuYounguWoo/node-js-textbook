// 201935231 컴퓨터공학과 김용우
const db = require('./db');
// db module

var s = require('sanitize-html');
// sanitize-html module

var func = require('./function');

/*
1. Context
context = {
            menu: Menu EJS
            who: User Name (손님, 회원 이름)
            body: BODY EJS
            logined: User Class
}
*/

module.exports = {
    login : (req, res) => { // LOGIN
        sql1 = `select * from boardtype;`
        sql2 = `select * from code_tbl;`
        db.query(sql1+sql2, (errs, results) => {
            var context = {
                menu: func.checkMenu(req),
                who: '손님',
                body: 'login.ejs',
                logined: 'NO',
                boardtypes: results[0],
                code: results[1]
            };
            req.app.render('home', context, (err, html) => {
                res.end(html);
            })
        });
    },

    login_process : (req, res) => {
        var post = req.body;
        sId = s(post.id);
        sPwd = s(post.pwd);

        db.query(
            'select count(*) as num from person where loginid = ? and password = ?',
            [sId, sPwd],
            (error, results) => {
                if (results[0].num === 1) {
                    db.query('select loginid, name, class from person where loginid = ? and password = ?',
                    [post.id, post.pwd],
                    (error, result) => {
                        req.session.is_logined = true;
                        req.session.name = result[0].name
                        req.session.class = result[0].class
                        req.session.loginid = result[0].loginid
                        res.redirect('/');
                    })
                } else {
                    req.session.is_logined = false;
                    req.session.name = '손님';
                    req.session.class = '99';
                    func.errorMessage(res, 'login failed', '/auth/login');
                    return;
                }
            })
    },

    logout_process: (req, res) => {
        req.session.destroy((err) => {
            res.redirect('/');
        })
    },

    join : (req, res) => {
        sql1 = `select * from boardtype;`
        sql2 = `select * from code_tbl;`
        db.query(sql1+sql2, (errs, results) => {
            var context = {
            menu: func.checkMenu(req),
            who: '손님',
            body: 'join.ejs',
            logined: 'NO',
            boardtypes: results[0],
            code: results[1]
        };
        req.app.render('home', context, (err, html) => {
            res.end(html);
        })
    })
    },

    join_process : (req, res) => {
        var post = req.body;
        sId = s(post.id);
        sPwd = s(post.pwd);
        sName = s(post.name);
        sTel = s(post.tel);
        sBirth = s(post.birth);
        sAddr = s(post.address);

        db.query('select loginid from person', (error, results) => {
            for (var i = 0; i < results.length; i++) {
                if (results[i].loginid === sId) {
                    res.write(`
                    <script type="text/javascript">
                    alert("ERROR :: duplicate login id");
                    location.href = "/auth/join";
                    </script>`);
                    return;
                }
            } // login id 중복 확인
            console.log(sId, sPwd, sName, sTel, sBirth, sAddr);
            db.query('insert into person values (?, ?, ?, ?, ?, ?, "02", 0)', [sId, sPwd, sName, sTel, sBirth, sAddr], (err, li) => {
                res.redirect('/auth/login');
            })
        });
    },
}