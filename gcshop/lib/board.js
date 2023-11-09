// 201935231 컴퓨터공학과 김용우

const db = require('./db');
// db module

var s = require('sanitize-html');
// sanitize-html module


function checkManager(req) {
    if (req.session.class === '00') return 'MANAGER';
    else if (req.session.class === '01') return 'ADMIN';
    else if (req.session.class === '02') return 'USER';
    else return 'NO';
} // Class Check Function

function errorMessage(res, msg, href) {
    res.write(`
    <script type="text/javascript">
    alert("ERROR :: ${msg}");
    location.href = "${href}";
    </script>`);
}


/*
1. Context
context = {
        menu: Menu EJS
        who: User Name (손님, 회원 이름)
        body: BODY EJS
        logined: User Class
        act: View, Update를 구분하기 위해 사용 / 'c': Create, 'u': Update
        info: Update를 위한 정보 / Create를 위한 빈 정보
        lists: View를 위한 정보
}
*/

module.exports = {
    typeView : (req, res) => {
        db.query('select * from boardtype', (errs, types) => {
            var context = {
                menu: 'menuForManager.ejs',
                who: req.session.name,
                body: 'boardtype.ejs',
                logined: checkManager(req),
                boardtypes: types
            }
            req.app.render('home', context, (err, html) => {
                res.end(html);
            })
        });
    },
    typeCreate : (req, res) => {
        db.query('select * from boardtype', (errs, types) => {
            var context = {
                menu: 'menuForManager.ejs',
                who: req.session.name,
                body: `boardtypeCU.ejs`,
                logined: checkManager(req),
                act: 'c',
                info: [],
                boardtypes: types
            }
            req.app.render('home', context, (err, html) => {
                res.end(html);
        })})

    },
    typeCreate_process : (req, res) => {
        var post = req.body;
        sTitle = s(post.title);
        sDes = s(post.description);
        sNum = s(post.numPerPage);
        sWrite = s(post.write_YN);
        sRe = s(post.re_YN);
            db.query(`INSERT INTO boardtype (title, description, numPerPage, write_YN, re_YN) VALUES(?, ?, ?, ?, ?)`,
            [post.title, sDes, sNum, sWrite, sRe],
            (error, result) => {
                res.redirect(`/board/type/view`)
                res.end();
            });
    },
    typeUpdate : (req, res) => {
        tId = s(req.params.typeId);
        db.query('select * from boardtype where type_id = ?',
        [tId],
        (errs, list) => {
        db.query('select * from boardtype', (errs, types) => {
            var context = {
                menu: 'menuForManager.ejs',
                who: req.session.name,
                body: `boardtypeCU.ejs`,
                logined: checkManager(req),
                act: 'u',
                info: list,
                boardtypes: types
            }
            req.app.render('home', context, (err, html) => {
                res.end(html);
        })})})
    },
    typeUpdate_process : (req, res) => {
        var post = req.body;
        sTitle = s(post.title);
        sDes = s(post.description);
        sNum = s(post.numPerPage);
        sWrite = s(post.write_YN);
        sRe = s(post.re_YN);
        sTid = s(post.type_id);
        db.query('UPDATE boardtype SET title=?, description=?, numPerPage=?, write_YN=?, re_YN=? where type_id=?',
        [post.title, sDes, sNum, sWrite, sRe, sTid],
        (error, result) => {
            res.writeHead(302, {Location: `/board/type/view`});
            res.end();
        });
    },
    typeDelete_process : (req, res) => {
    },

view : (req, res) => { // VIEW
    sTid = s(req.params.typeId);
    pNum = req.params.pNum;
    var menu = (req.session.class === '02') ? 'menuForCustomer.ejs' : 'menuForManager.ejs';
    sql1 = 'select * from boardtype;'
    sql2 = `select p.name, b.loginid, b.board_id, b.type_id, b.title, b.date, b.content from board b inner join person p on p.loginid = b.loginid where type_id=${sTid};`
    sql3 = `select count(*) as count from board where type_id=${sTid};`
    db.query(sql1 + sql2 + sql3, (error, results) => {
        var numPerPage = results[0][0].numPerPage;
        var offs = (pNum - 1) * numPerPage;
        var totalPages = Math.ceil(results[2][0].count / numPerPage);
        db.query(
            `
            select b.board_id as board_id, b.title as title, b.date as date, p.name as name
            from board b inner join person p on b.loginid = p.loginid
            where b.type_id = ? and b.p_id = ? ORDER BY date desc, board_id desc LIMIT ? OFFSET ?`,
            [
                sTid, 0, numPerPage, offs
            ],
            (err, boards) => {
                var context = {
                    menu: menu,
                    // 고객인지 아닌지도 확인
                    who: req.session.name,
                    body: 'board.ejs',
                    logined: checkManager(req),
                    lists: boards,
                    boardtypes: results[0],
                    totalPages: totalPages,
                    pNum: pNum,
                }
                req.app.render('home', context, (err, html) => {
                    res.end(html);
                });
            }
        );
    });

},
    create : (req, res) => { // CREATE
        tId = s(req.params.typeId);
        db.query('select * from boardtype', (errs, types) => {
            var context = {
                menu: 'menuForManager.ejs',
                who: req.session.name,
                body: `boardCRU.ejs`,
                logined: checkManager(req),
                act: 'c',
                info: [],
                boardtypes: types,
                userId: req.session.loginid,
            }
            req.app.render('home', context, (err, html) => {
                res.end(html);
        })})
    },
    create_process : (req, res) => {
        var post = req.body;
        sTid = s(post.type_id);
        sPid = s(post.p_id);
        sId = s(post.loginid);
        sTitle = s(post.title);
        sPwd = s(post.password);
        sDate = Date.now();
        sContent = s(post.content);
            db.query(`INSERT INTO board (type_id, p_id, loginid, title, password, date, content) VALUES(?, ?, ?, ?, ?, ?, ?)`,
            [sTid, 0, sId, sTitle, sPwd, sDate, sContent],
            (error, result) => {
                res.redirect(`/board/view/${sTid}/1`)
                res.end();
            });
            console.log(sPid);

    },
    detail : (req, res) => {

    },
    update : (req, res) => {

    },
    update_process : (req, res) => {

    },
    delete_process : (req, res) => {

    },
}