// 201935231 컴퓨터공학과 김용우
const db = require('./db');

var func = require('./function');
// db module

module.exports = {
    home : (req, res) => {
        var isOwner = func.authIsOwner(req, res);
        sql1 = `select * from boardtype;`
        sql2 = `select * from merchandise;`
        sql3 = `select * from code_tbl;`
        db.query(sql1 + sql2 + sql3, (err, results) => {
            if (isOwner) {
                if (req.session.class === '00') {
                    var context = {
                        menu: func.checkMenu(req),
                        who: req.session.name,
                        body: 'merchandise.ejs',
                        lists: results[1],
                        logined: func.checkManager(req),
                        act: 'v',
                        boardtypes: results[0],
                        code: results[2]
                    };
                } else if (req.session.class === '01') {
                    var context = {
                        menu: func.checkMenu(req),
                        who: req.session.name,
                        body: 'merchandise.ejs',
                        lists: results[1],
                        logined: func.checkManager(req),
                        act: 'v',
                        boardtypes: results[0],
                        code: results[2]
                    };
                } else if (req.session.class === '02') {
                    var context = {
                        menu: func.checkMenu(req),
                        who: req.session.name,
                        body: 'merchandise.ejs',
                        lists: results[1],
                        logined: func.checkManager(req),
                        act: 'v',
                        boardtypes: results[0],
                        code: results[2]
                    };
                }
            } else {
                var context = {
                    menu: func.checkMenu(req),
                    who: '손님',
                    body: 'merchandise.ejs',
                    lists: results[1],
                    logined: func.checkManager(req),
                    act: 'v',
                    boardtypes: results[0],
                    code: results[2]
                };
            }
            req.app.render('home', context, (err, html) => {
            res.end(html);
        })
    })
},
    category : (req, res) => {
        category = req.params.category;
        sql1 = `select * from boardtype;`
        sql2 = `select * from merchandise where category = ${category};`
        sql3 = `select * from code_tbl;`
        db.query(sql1 + sql2 + sql3, (err, results) => {
            var context = {
                menu: func.checkMenu(req),
                who: req.session.name,
                body: `merchandise.ejs`,
                logined: func.checkManager(req),
                lists: results[1],
                act: 'v',
                boardtypes: results[0],
                code: results[2]
            }
            console.log(context);
            req.app.render('home', context, (err, html) => {
                res.end(html);
            })
    })
    },
}