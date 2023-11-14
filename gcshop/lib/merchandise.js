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
        catego: 분류 불러오기
        lists: View를 위한 정보
}
*/
module.exports = {
    view : (req, res) => {
        act = req.params.vu;
        sql1 = `select * from boardtype;`
        sql2 = `select * from merchandise;`
        sql3 = `select * from code_tbl;`
        db.query(sql1 + sql2 + sql3, (errs, results) => {
            var context = {
                menu: func.checkMenu(req),
                who: req.session.name,
                body: `merchandise.ejs`,
                logined: func.checkManager(req),
                lists: results[1],
                act: act,
                boardtypes: results[0],
                code: results[2]
            }
            req.app.render('home', context, (err, html) => {
                res.end(html);
            })
        })
    },
    create : (req, res) => {
        sql1 = `select * from boardtype;`
        sql2 = `select sub_name, sub_id from code_tbl;`
        sql3 = `select * from code_tbl;`
        db.query(sql1 + sql2 + sql3, (errs, results) => {
            var context = {
                menu: func.checkMenu(req),
                who: req.session.name,
                body: `merchandiseCU.ejs`,
                logined: func.checkManager(req),
                act: 'c',
                info: [],
                catego: results[1],
                boardtypes: results[0],
                code: results[2]
            }
            req.app.render('home', context, (err, html) => {
                res.end(html);
            })
        })
    },
    create_process : (req, res, file) => {
        var post = req.body;

        sName = s(post.name)
        sPrice = s(post.price)
        sStock = s(post.stock)
        sBrand = s(post.brand)
        sSupplier = s(post.supplier)
        sSaleYn = s(post.sale_yn)
        sSalePrice = s(post.sale_price)
        sFile = s(file)

        db.query(`INSERT INTO merchandise (category, name, price, stock, brand, image, supplier, sale_yn, sale_price) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [post.category, sName, sPrice, sStock, sBrand, sFile, sSupplier, sSaleYn, sSalePrice],
                (error, result) => {
                    if (error) throw error;
                    res.redirect(`/merchandise/view/v`)
                    res.end();
                });
    },
    update : (req, res) => {
        id = req.params.merId;
        sql1 = `select * from boardtype;`
        sql2 = `select sub_name, sub_id from code_tbl;`
        sql3 = `select * from merchandise where mer_id = ${id};`
        sql4 = `select * from code_tbl;`
        db.query(sql1 + sql2 + sql3, (errs, results) => {
            var context = {
                menu: func.checkMenu(req),
                who: req.session.name,
                body: `merchandiseCU.ejs`,
                logined: func.checkManager(req),
                act: 'u',
                info: results[2],
                catego: results[1],
                boardtypes: results[0],
                code: results[3]
            }
            req.app.render('home', context, (err, html) => {
                res.end(html);
            })
        })
    },
    update_process : (req, res, file) => {
        var post = req.body;
        sName = s(post.name)
        sPrice = s(post.price)
        sStock = s(post.stock)
        sBrand = s(post.brand)
        sSupplier = s(post.supplier)
        sSaleYn = s(post.sale_yn)
        sSalePrice = s(post.sale_price)

        db.query('UPDATE merchandise SET category=?, name=?, price=?, stock=?, brand=?, image=?, supplier=?, sale_yn=?, sale_price=? where mer_id=?',
        [post.category, sName, sPrice, sStock, sBrand, file, sSupplier, sSaleYn, sSalePrice, post.mer_id],
        (error, result) => {
            res.writeHead(302, {Location: `/merchandise/view/u`});
            res.end();
        });
    },
    delete_process : (req, res) => {
        id = req.params.merId;
            db.query('DELETE FROM merchandise WHERE mer_id = ?',
            [id],
            (error, result) => {
                if( error ) throw error;
                res.writeHead(302, {Location: `/merchandise/view/u`});
                res.end();
            });
    },
}