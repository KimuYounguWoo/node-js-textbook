// 201935231 컴퓨터공학과 김용우
const db = require('./db');
// db module

var s = require('sanitize-html');
// sanitize-html module

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
        var context = {
            menu: 'menuForCustomer.ejs',
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
                    res.redirect('/');
                }
            })
            console.log(`sessionsss id: ${req.session.loginid}`)
    },

    logout_process: (req, res) => {
        req.session.destroy((err) => {
                res.redirect('/');
            })
    },

    join : (req, res) => {
        var context = {
            menu: 'menuForCustomer.ejs',
            who: '손님',
            body: 'join.ejs',
            logined: 'NO'
        };
        req.app.render('home', context, (err, html) => {
            res.end(html);
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
            db.query(
                'insert into person values (?, ?, ?, ?, ?, ?, "02", 0)',
                [sId, sPwd, sName, sAddr, sTel, sBirth],
                (error, results) => {
                    if (error) throw error;
                    res.redirect('/auth/login');
                })
        });

    },
}