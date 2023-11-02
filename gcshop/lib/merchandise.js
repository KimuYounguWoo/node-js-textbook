// 201935231 컴퓨터공학과 김용우

var qs = require('querystring');
// querystring module

const db = require('./db');
// db module

function authIsOwner(req) {
    if (req.session.is_logined) return true;
    else return false;
}

function authStatusUI(req) {
    var login = '<a href = "/login">login</a>';
    if (authIsOwner(req)) {
        login = '<a href="/logout_process">logout</a>'
    } return login;
} // login context change

module.exports = {
    view : (req, res) => {
        act = req.params.vu;
        var isOwner = authIsOwner(req, res);
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
        var isOwner = authIsOwner(req, res);
            var context = {
                menu: 'menuForManager.ejs',
                who: req.session.name,
                body: `merchandiseCU.ejs`,
                logined: 'YES',
                act: 'c',
                info: [],
            }
            req.app.render('home', context, (err, html) => {
            res.end(html);
        })
    },
    create_process : (req, res) => {
        var isOwner = authIsOwner(req, res);
        var post = req.body;
        db.query(`INSERT INTO merchandise (category, name, price, stock, brand, image, supplier, sale_yn, sale_price) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                ['0001', post.name, post.price, post.stock, post.brand, `/images/${req.file.originalname}`, post.supplier, post.sale_yn, post.sale_price],
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
            db.query('UPDATE topic SET category=?, name=?, price=?, stock=?, brand=?, image=?, supplier=?, sale_yn=?, sale_price=?',
            ['0001', post.name, post.price, post.stock, post.brand, file, post.supplier, post.sale_yn, post.sale_price],
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