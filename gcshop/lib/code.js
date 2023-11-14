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
    view : (req, res) => {
        act = req.params.vu;
        sql1 = `select * from boardtype;`
        sql2 = `select * from code_tbl;`

        db.query(sql1 + sql2, (errs, results) => {
            var context = {
                menu: func.checkMenu(req),
                who: req.session.name,
                body: `code.ejs`,
                logined: func.checkManager(req),
                boardtypes: results[0],
                lists: results[1],
                code: results[1]
            }
            req.app.render('home', context, (err, html) => {
                res.end(html);
            })
        })
    },
    create : (req, res) => {
        sql1 = `select * from boardtype;`
        sql2 = `select * from code_tbl;`
        db.query(sql1 + sql2, (errs, results) => {
            var context = {
                menu: func.checkMenu(req),
                who: req.session.name,
                body: `codeCU.ejs`,
                logined: func.checkManager(req),
                act: 'c',
                info: [],
                boardtypes: results[0],
                code: results[1],
            }
            req.app.render('home', context, (err, html) => {
                res.end(html);
            })
        })
    },
    create_process : (req, res) => {
        var post = req.body;
        sMid = s(post.main_id)
        sMname = s(post.main_name)
        sSid = s(post.sub_id)
        sSname = s(post.sub_name)
        sStart = s(post.start)
        sEnd = s(post.end)
        db.query('select main_id, sub_id from code_tbl', (err, code) => {
            for (var i = 0; i < code.length; i++) {
                if (code[i].main_id = sMid && code[i].sub_id == sSid) { //
                    func.errorMessage(res, 'duplicate code', '/code/view/u');
                    return;
                }
            } 
            db.query(`INSERT INTO code_tbl (main_id, main_name, sub_id, sub_name, start, end) VALUES(?, ?, ?, ?, ?, ?)`,
            [sMid, sMname, sSid, sSname, sStart, sEnd],
            (error, result) => {
                res.redirect(`/code/view/u`)
                res.end();
            });
        });
    },

    update : (req, res) => {
        main = req.params.main;
        sub = req.params.sub;
        sql1 = `select * from boardtype;`
        sql2 = `select * from code_tbl where main_id = ${main} and sub_id = ${sub};`
        sql3 = `select * from code_tbl;`
        db.query(sql1 + sql2 + sql3, (errs, results) => {
            var context = {
                menu: func.checkMenu(req),
                who: req.session.name,
                body: `codeCU.ejs`,
                logined: func.checkManager(req),
                act: 'u',
                info: results[1],
                boardtypes: results[0],
                code: results[2]
            }
            req.app.render('home', context, (err, html) => {
                res.end(html);
            })
        })
    },

    update_process : (req, res) => {
        var post = req.body;
        sMid = s(post.main_id)
        sMname = s(post.main_name)
        sSid = s(post.sub_id)
        sSname = s(post.sub_name)
        sStart = s(post.start)
        sEnd = s(post.end)
        db.query('select main_id, sub_id from code_tbl', (err, code) => {
            for (var i = 0; i < code.length; i++) {
                if (code[i].main_id = sMid && code[i].sub_id == sSid && sMid != post.mid && sSid != post.sid) { // MAIN과 SUB가 모두 같은 경우
                    func.errorMessage(res, 'duplicate code', '/code/view/u');
                    return;
                }
            } // main_id, sudz_id 중복 확인
            db.query(
                'UPDATE code_tbl SET main_id=?, main_name=?, sub_id=?, sub_name=?, start=?, end=? where main_id=? and sub_id=?',
                [sMid, sMname, sSid, sSname, sStart, sEnd, post.mid, post.sid],
                (error, result) => {
                    res.writeHead(302, {Location: `/code/view/u`});
                    res.end();
                });
            });
    },

    delete_process : (req, res) => {
        main = req.params.main;
        sub = req.params.sub;

        db.query('select mer_id, name from merchandise where category=?',
        [sub],
        (err, mer) => {
            if (mer.length > 0) {
                func.errorMessage(res, `cannot delete code [${mer[0].mer_id}] item is exist`, '/code/view/u');
                return;
            }
            db.query('DELETE FROM code_tbl WHERE main_id = ? and sub_id = ?',
            [main, sub],
            (error, result) => {
                if( error ) throw error;
                res.writeHead(302, {Location: `/code/view/u`});
                    res.end();
            });
        });
    },
}