// 201935231 컴퓨터공학과 김용우

const db = require('./db');
// db module

var s = require('sanitize-html');
// sanitize-html module

function checkManager(req) {
    if (req.session.class === '00') return 'MANAGER';
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
    view : (req, res) => {
        act = req.params.vu;

        db.query('select * from code_tbl', (err, code) => {
            var context = {
                menu: 'menuForManager.ejs',
                who: req.session.name,
                body: `code.ejs`,
                logined: checkManager(req),
                lists: code,
                act: act
            }
            req.app.render('home', context, (err, html) => {
                res.end(html);
            })
        })
    },
    create : (req, res) => {
            var context = {
                menu: 'menuForManager.ejs',
                who: req.session.name,
                body: `codeCU.ejs`,
                logined: checkManager(req),
                act: 'c',
                info: [],
            }
            req.app.render('home', context, (err, html) => {
                res.end(html);
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
        // Sanitize-html
        // db.query('select main_id, sub_id from code_tbl', (err, code) => {
        //     for (var i = 0; i < code.length; i++) {
        //         if (code[i].main_id = sMid && code[i].sub_id == sSid) { //
        //             errorMessage(res, 'duplicate code', '/code/view/u');
        //             return;
        //         }
        //     } // main_id, sudz_id 중복 확인
            db.query(`INSERT INTO code_tbl (main_id, main_name, sub_id, sub_name, start, end) VALUES(?, ?, ?, ?, ?, ?)`,
            [sMid, sMname, sSid, sSname, sStart, sEnd],
            (error, result) => {
                console.log(`New Code Inserted`)
                console.log(`main_id: ${sMid}, main_name: ${sMname}, sub_id: ${sSid}, sub_name: ${sSname}, start: ${sStart}, end: ${sEnd}`)
                res.redirect(`/code/view/u`)
                res.end();
            });
        // });
    },

    update : (req, res) => {
        main = req.params.main;
        sub = req.params.sub;

        db.query(`select * from code_tbl where main_id = ? and sub_id = ?`,
        [main, sub],
        (err, code) => {
            var context = {
                menu: 'menuForManager.ejs',
                who: req.session.name,
                body: `codeCU.ejs`,
                logined: checkManager(req),
                act: 'u',
                info: code
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

        // db.query('select main_id, sub_id from code_tbl', (err, code) => {
        //     for (var i = 0; i < code.length; i++) {
        //         if (code[i].main_id = sMid && code[i].sub_id == sSid && sMid != post.mid && sSid != post.sid) { // MAIN과 SUB가 모두 같은 경우
        //             errorMessage(res, 'duplicate code', '/code/view/u');
        //             return;
        //         }
        //     } // main_id, sudz_id 중복 확인
            db.query(
                'UPDATE code_tbl SET main_id=?, main_name=?, sub_id=?, sub_name=?, start=?, end=? where main_id=? and sub_id=?',
                [sMid, sMname, sSid, sSname, sStart, sEnd, post.mid, post.sid],
                // [sMid, sMname, sSid, sSname, sStart, sEnd] -> Input data
                // [post.mid, post.sid] -> Where data
                (error, result) => {
                    console.log(`New Code Updated`)
                    console.log(`main_id: ${sMid}, main_name: ${sMname}, sub_id: ${sSid}, sub_name: ${sSname}, start: ${sStart}, end: ${sEnd} / Target Code = ${post.mid}, ${post.sid}`)
                    res.writeHead(302, {Location: `/code/view/u`});
                    res.end();
                });
            // });
    },

    delete_process : (req, res) => {
        main = req.params.main;
        sub = req.params.sub;

        db.query('select mer_id, name from merchandise where category=?',
        [sub],
        (err, mer) => {
            if (mer.length > 0) {
                errorMessage(res, `cannot delete code [${mer[0].mer_id}] item is exist`, '/code/view/u');
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