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
        act: View, Update를 구분하기 위해 사용 / 'c': Create, 'u': Update
        info: Update를 위한 정보 / Create를 위한 빈 정보
        lists: View를 위한 정보
}
*/

module.exports = {
    typeView : (req, res) => {
        sql1 = `select * from boardtype;`
        sql2 = `select * from code_tbl;`
        db.query(sql1+sql2, (errs, results) => {
            var context = {
                menu: func.checkMenu(req),
                who: req.session.name,
                body: 'boardtype.ejs',
                logined: func.checkManager(req),
                boardtypes: results[0],
                code: results[1]
            }
            req.app.render('home', context, (err, html) => {
                res.end(html);
            })
        });
    },
    typeCreate : (req, res) => {
        sql1 = `select * from boardtype;`
        sql2 = `select * from code_tbl;`
        db.query(sql1+sql2, (errs, results) => {
            var context = {
                menu: func.checkMenu(req),
                who: req.session.name,
                body: `boardtypeCU.ejs`,
                logined: func.checkManager(req),
                act: 'c',
                info: [],
                boardtypes: results[0],
                code: results[1]            }
            req.app.render('home', context, (err, html) => {
                res.end(html);
            })
        })
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
        sql1 = `select * from boardtype where type_id = ${tId};`
        sql2 = `select * from boardtype;`
        sql3 = `select * from code_tbl;`

        db.query(sql1+sql2+sql3, (errs, results) => {
            var context = {
                menu: func.checkMenu(req),
                who: req.session.name,
                body: `boardtypeCU.ejs`,
                logined: func.checkManager(req),
                act: 'u',
                info: results[0],
                boardtypes: results[1],
                code: results[2]
            }
            req.app.render('home', context, (err, html) => {
                res.end(html);
            })
        })
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
        tId = req.params.typeId;
        db.query(`select * from board where type_id = ?`, [tId], (err, exist) => {
            if (exist.length > 0) {
                func.errorMessage(res, 'item exists.', '/board/type/view');
                return;
            }
            else {
                db.query(`delete from boardtype where type_id = ?`, [tId], (err, result) => {
                    res.writeHead(302, {Location: `/board/type/view`});
                    res.end();
                })
            }
        })
    },

    view : (req, res) => { // VIEW
        sTid = s(req.params.typeId);
        pNum = req.params.pNum;
        console.log(sTid, pNum)
        sql1 = 'select * from boardtype;'
        sql2 = `select p.name, b.loginid, b.board_id, b.type_id, b.title, b.date, b.content from board b inner join person p on p.loginid = b.loginid where type_id=${sTid};`
        sql3 = `select count(*) as count from board where type_id=${sTid};`
        sql4 = `select * from code_tbl;`
        sql5 = `select * from boardtype where type_id = ${sTid};`
        db.query(sql1 + sql2 + sql3 + sql4 + sql5, (error, results) => {
            var numPerPage = results[0][0].numPerPage;
            var offs = (pNum - 1) * numPerPage;
            var totalPages = Math.ceil(results[2][0].count / numPerPage) + 1;
            db.query(`
            select b.board_id as board_id, b.title as title, b.date as date, p.name as name
            from board b inner join person p on b.loginid = p.loginid
            where b.type_id = ? and b.p_id = ? ORDER BY date desc, board_id desc LIMIT ? OFFSET ?`,
            [sTid, 0, numPerPage, offs], (err, boards) => {
                var context = {
                    menu: func.checkMenu(req),
                    who: req.session.name,
                    body: 'board.ejs',
                    logined: func.checkManager(req),
                    lists: boards,
                    boardtypes: results[0],
                    totalPages: totalPages,
                    pNum: pNum,
                    code: results[3],
                    type: sTid,
                    current: results[4],
                }
                req.app.render('home', context, (err, html) => {
                    res.end(html);
                });
            });
        });
    },
    create : (req, res) => { // CREATE
        tId = req.params.typeId
        sql1 = `select * from boardtype;`
        sql2 = `select * from code_tbl;`
        db.query(sql1 + sql2, (errs, results) => {
            var context = {
                menu: func.checkMenu(req),
                who: req.session.name,
                body: `boardCRU.ejs`,
                logined: func.checkManager(req),
                act: 'c',
                info: [],
                boardtypes: results[0],
                userId: req.session.loginid,
                pNum: 0,
                code: results[1],
                typeId: tId,
            }
            req.app.render('home', context, (err, html) => {
                res.end(html);
            })
        })
    },
    create_process : (req, res) => {
        var post = req.body;
        sTid = s(post.type_id);
        sPid = s(post.p_id);
        sId = s(post.loginid);
        sTitle = s(post.title);
        sPwd = s(post.password);
        sDate = func.dateOfEightDigit();
        sContent = s(post.content);

        db.query(`INSERT INTO board (type_id, p_id, loginid, title, password, date, content) VALUES(?, ?, ?, ?, ?, ?, ?)`,
        [sTid, 0, sId, sTitle, sPwd, sDate, sContent],
        (error, result) => {
            console.log(sTid);
            res.redirect(`/board/view/${sTid}/1`)
            res.end();
        });
    },
    detail : (req, res) => {
        tid = req.params.typeId;
        pid = req.params.pNum;
        bid = req.params.boardId;
        sql1 = `select * from boardtype;`
        sql2 = `select * from code_tbl;`
        sql3 = `select p.name as name, b.loginid as loginid, b.board_id as board_id, b.type_id as type_id, b.title as title, b.date as date, b.content as content from board b inner join person p on p.loginid = b.loginid where type_id=${tid} and board_id = ${bid};`
        db.query(sql1+sql2+sql3, (error, results) => {
            var context = {
                menu: func.checkMenu(req),
                boardtypes: results[0],
                code: results[1],
                who: req.session.name,
                body: `boardCRU.ejs`,
                logined: func.checkManager(req),
                act: 'v',
                info: results[2],
                pNum: pid,
                auth: func.checkAuth(req),
            }
            console.log(results[2][0])
            req.app.render('home', context, (err, html) => {
                res.end(html);
            })
        })
    },
    update : (req, res) => {
        tId = s(req.params.typeId);
        pNum = req.params.pNum;
        bId = s(req.params.boardId);
        sql1 = `select * from boardtype;`
        sql2 = `select * from board where board_id = ${bId} and type_id =${tId};`
        sql3 = `select p.name as name, b.loginid as loginid, b.board_id as board_id, b.type_id as type_id, b.title as title, b.date as date, b.content as content from board b inner join person p on p.loginid = b.loginid where type_id=${tId} and board_id = ${bId};`
        sql4 = `select * from code_tbl;`
        db.query(sql1+sql2+sql3+sql4, (error, results) => {
            var context = {
                menu: func.checkMenu(req),
                who: req.session.name,
                body: `boardCRU.ejs`,
                logined: func.checkManager(req),
                act: 'u',
                info: results[1], // values
                boardtypes: results[0],
                userId: results[2][0].loginid,
                pNum: pNum,
                code: results[3],
                typeId: tId,
                boardId: bId,
            }
            req.app.render('home', context, (err, html) => {
                res.end(html);
            })
        })
    },
    update_process : (req, res) => {
        var post = req.body;
        sId = s(post.loginid);
        sTitle = s(post.title);
        sPwd = s(post.password);
        sDate = func.dateOfEightDigit();
        sContent = s(post.content);
        sTid = s(post.type_id);
        sPid = s(post.p_id);
        sBid = s(post.board_id);
        pNum = post.pNum;
        console.log(`${sId}, ${sTitle}, ${sPwd}, ${sDate}, ${sContent}, ${sTid}, ${sBid}`);
        db.query('UPDATE board SET loginid=?, title=?, password=?, date=?, content=? where type_id=? and board_id=?',
        [sId, sTitle, sPwd, sDate, sContent, sTid, sBid],
        (error, result) => {
            res.redirect(`/board/view/${sTid}/1`)
            res.end();
        });
    },
    delete_process : (req, res) => {
        tId = req.params.typeId;
        bId = req.params.boardId;
        pNum = req.params.pNum;
        sql1 = `delete from board where type_id = ${tId} and board_id = ${bId};`
        db.query(sql1, (err, results) => {
            res.writeHead(302, {Location: `/board/view/${tId}/${pNum}`});
            res.end();
        })
    },
}