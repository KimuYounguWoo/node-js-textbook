// 201935231 컴퓨터공학과 김용우
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
        act: View, Update를 구분하기 위해 사용 / 'c': Create, 'u': Update
        info: Update를 위한 정보 / Create를 위한 빈 정보
        lists: View를 위한 정보
}
*/

module.exports = {
    view : (req, res) => {
        console.log(`${req.session.class} ${req.session.name} ${checkManager(req)}`)
        act = req.params.vu;
        db.query('select * from boardtype', (errs, types) => {
        db.query('select * from person', (err, it) => {
            var context = {
                menu: 'menuForManager.ejs',
                who: req.session.name,
                body: `person.ejs`,
                logined: checkManager(req),
                lists: it,
                act: act,
                boardtypes: types
            }
            req.app.render('home', context, (err, html) => {
            res.end(html);
        })
        })})
    },
    create : (req, res) => {
        db.query('select * from boardtype', (errs, types) => {
            var context = {
                menu: 'menuForManager.ejs',
                who: req.session.name,
                body: `personCU.ejs`,
                logined: checkManager(req),
                act: 'c',
                info: [],
                boardtypes: types
            }
            req.app.render('home', context, (err, html) => {
            res.end(html);
        })})
    },
    create_process : (req, res) => {
        var post = req.body;
        sId = s(post.id);
        sPwd = s(post.pwd);
        sName = s(post.name);
        sAddr = s(post.addr);
        sTel = s(post.tel);
        sBirth = s(post.birth);
        sClass = s(post.class);
        sPoint = s(post.point);
        // db.query('select loginid from person', (error, results) => {
        //     for (var i = 0; i < results.length; i++) {
        //         if (results[i].loginid === sId) {
        //             errorMessage(res, 'duplicate login id', '/person/view/u');
        //             return;
        //         }
        //     } // login id 중복 확인
            db.query(`INSERT INTO person (loginid, password, name, address, tel, birth, class, point) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
                    [sId, sPwd, sName, sAddr, sTel, sBirth, sClass, sPoint],
                    (error, result) => {
                        if (error) throw error;
                        res.redirect(`/person/view/v`)
                        res.end();
                    });
        // });
    },

    update : (req, res) => {
        id = req.params.id;
        db.query('select * from boardtype', (errs, types) => {
        db.query(`select * from person where loginid = ?`,
        [id],
        (err, li) => {
            var context = {
                menu: 'menuForManager.ejs',
                who: req.session.name,
                body: `personCU.ejs`,
                logined: checkManager(req),
                act: 'u',
                info: li,
                boardtypes: types
            }
            req.app.render('home', context, (err, html) => {
            res.end(html);
        })
        })})
    },
    update_process : (req, res, file) => {
        var post = req.body;

        sId = s(post.id);
        sPwd = s(post.pwd);
        sName = s(post.name);
        sAddr = s(post.addr);
        sTel = s(post.tel);
        sBirth = s(post.birth);
        sClass = s(post.class);
        sPoint = s(post.point);
        // db.query('select loginid from person', (error, results) => {
        //     for (var i = 0; i < results.length; i++) {
        //         if (results[i].loginid === sId && sId !== post.log_id) { // DB에 있는 ID와 같고, 수정하려는 ID와 다를 때
        //             errorMessage(res, 'duplicate login id', '/person/view/u');
        //             return;
        //         }
        //     } // login id 중복 확인
        db.query(
            'UPDATE person SET loginid=?, password=?, name=?, address=?, tel=?, birth=?, class=?, point=? where loginid=?',
            [sId, sPwd, sName, sAddr, sTel, sBirth, sClass, sPoint, post.log_id],
            (error, result) => {
                res.writeHead(302, {Location: `/person/view/u`});
                res.end();
            });
        // });
    },
    delete_process : (req, res) => {
        id = req.params.id;
        console.log(`${id} ${req.session.loginid}`)
        console.log(req.session)
        if (id === req.session.loginid) {
            errorMessage(res, 'Current login user', '/person/view/u');
            return;
        }
        db.query('DELETE FROM person WHERE loginid=?',
        [id],
        (error, result) => {
            if( error ) throw error;
            res.writeHead(302, {Location: `/person/view/u`});
            res.end();
        });
    },
}