// 201935231 컴퓨터공학과 김용우

var qs = require('querystring');
// querystring module

const db = require('./db');
// db module

var s = require('sanitize-html');
// sanitize-html module

module.exports = {
    view : (req, res) => {
        act = req.params.vu;
        db.query('select * from merchandise', (err, it) => {
            var context = {
                menu: 'menuForManager.ejs',
                who: req.session.name,
                body: `merchandise.ejs`,
                logined: 'YES',
                lists: it,
                act: act
            }
            req.app.render('home', context, (err, html) => {
            res.end(html);
        })
        })
    },
    create : (req, res) => {
        db.query("select sub_name, sub_id from code_tbl", (error, cate) => {
            var i = 0;
            var tag = '';
            var context = {
                menu: 'menuForManager.ejs',
                who: req.session.name,
                body: `merchandiseCU.ejs`,
                logined: 'YES',
                act: 'c',
                info: [],
                catego: cate,
            }
            req.app.render('home', context, (err, html) => {
            res.end(html);
        })
        })

    },
    create_process : (req, res) => {
        var post = req.body;

        sName = s(post.name)
        sPrice = s(post.price)
        sStock = s(post.stock)
        sBrand = s(post.brand)
        sSupplier = s(post.supplier)
        sSaleYn = s(post.sale_yn)
        sSalePrice = s(post.sale_price)

        db.query(`INSERT INTO merchandise (category, name, price, stock, brand, image, supplier, sale_yn, sale_price) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                ['0001', sName, sPrice, sStock, sBrand, `/images/${req.file.originalname}`, sSupplier, sSaleYn, sSalePrice],
                (error, result) => {
                    if (error) throw error;
                    res.redirect(`/`)
                    res.end();
                });
    },
    update : (req, res) => {
        var isOwner = authIsOwner(req, res);
        id = req.params.merId;
        db.query(`select * from merchandise where mer_id = ${id}`, (err, li) => {
            var context = {
                menu: 'menuForManager.ejs',
                who: req.session.name,
                body: `merchandiseCU.ejs`,
                logined: 'YES',
                act: 'u',
                info: li
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
            db.query('UPDATE topic SET category=?, name=?, price=?, stock=?, brand=?, image=?, supplier=?, sale_yn=?, sale_price=?',
            ['0001', sName, sPrice, sStock, sBrand, file, sSupplier, sSaleYn, sSalePrice],
            (error, result) => {
                res.writeHead(302, {Location: `/`});
                res.end();
            });
        },
    delete_process : (req, res) => {
        id = req.params.merId;
            db.query('DELETE FROM merchandise WHERE mer_id = ?',
            [id],
            (error, result) => {
                if( error ) throw error;
                res.writeHead(302, {Location: `/`});
                res.end();
            });
    },
}