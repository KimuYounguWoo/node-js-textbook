// 201935231 컴퓨터공학과 김용우
var qs = require('querystring');
const db = require('./db');

module.exports = {
    home : (req,res) => {
        db.query('SELECT * FROM customer', (error,customers) => {
            var c = '<a href="/create">create</a>'
            var b = '<h2>Welcome</h2><p>Customer Page</p>'
            var context = {
                list:customers,
                control:c,
                body:b
            };
                req.app.render('home', context, (err,html)=> {
                    res.end(html)
                })
            });
        },
        page : (req,res) => {
            var id = req.params.pageId;
            db.query('SELECT * FROM customer', (error, customers) => {
                if( error ) {
                    throw error;
                }
                db.query(`SELECT * FROM customer WHERE id = ${id}`
                ,(error2, customer) => {
                    if ( error2 ) {
                        throw error2;
                    }
                let dates = customer[0].birth.getFullYear() + '-' + (customer[0].birth.getMonth()+1) + '-' + customer[0].birth.getDate();
                var c = `<a href="/create">create</a>&nbsp;&nbsp;<a href="/update/${customer[0].id}">update</a>&nbsp;&nbsp; <a href="/delete/${customer[0].id}" onclick='if(confirm("정말로 삭제하시겠습니까?")==false){ return false }'>delete</a>`
                var b = `
                <h2>${customer[0].name}</h2>
                <p>이름: ${customer[0].name}</p>
                <p>주소: ${customer[0].address}</p>
                <p>생년월일: ${dates}</p>
                <p>전화번호: ${customer[0].phone}</p>
                `
                var context = {
                    list:customers,
                    control:c,
                    body:b
                };
                res.app.render('home', context, (err,html) => {
                    res.end(html);
                })
            })
        });
    },
    create : (req,res) => {
        db.query(`SELECT * FROM customer`, (error,customers) => {
            if( error ) {
                throw error;
            }
            var context = {
            list:customers,
            control: `<a href="/create">create</a>`,
            body :`
            <form action="/create_process" method="post">
            <p><input type="text" name="name" placeholder="name"></p>
            <p><input type="text" name="address" placeholder="address"></p>
            <p><input type="date" name="birth"></p>
            <p><input type="text" name="phone" placeholder="phone"></p>
            <p><input type="submit"></p></form>
            `};
            req.app.render('home',context, (err, html) => {
                res.end(html);
            });
        });
    },
    create_process : (req,res) => {
        var body = '';
        req.on('data', (data) => {
            body = body + data;
        });
        req.on('end', () => {
            var post = qs.parse(body);
            db.query(`INSERT INTO customer (name, address, birth, phone) VALUES(?, ?, ?, ?)`,
            [post.name, post.address, post.birth, post.phone],
            (error, result) => {
                if ( error ) {
                    throw error;
                }
                res.writeHead(302, {Location: `/page/${result.insertId}`});
                res.end();
            });
        });
    },
    update : function(req, res) {
        id = req.params.pageId;
        db.query('SELECT * FROM customer', function(error, customers) {
            if ( error ) {
                throw error;
            }
            db.query(`SELECT * FROM customer WHERE id=?`,
            [id],
            function(error2, customer) {
                if( error2 ) {
                    throw error2;
                }
                var context = {
                    list:customers,
                    control: `<a href="/create">create</a>&nbsp;&nbsp;<a href="/update/${customer[0].id}">update</a>&nbsp;&nbsp; <a href="/delete/${customer[0].id}" onclick='if(confirm("정말로 삭제하시겠습니까?")==false){ return false }'>delete</a>`,
                    body: `
                    <form action="/update_process" method="post">
                    <input type="hidden" name="id" value="${customer[0].id}">
                    <p><input type="text" name="name" placeholder="name" value="${customer[0].name}"></p>
                    <p><input type="text" name="address" placeholder="address" value="${customer[0].address}"></p>
                    <p><input type="date" name="birth" value="${customer[0].birth}"></p>
                    <p><input type="text" name="phone" placeholder="phone" value="${customer[0].phone}"></p>
                    <p><input type="submit"></p>
                    </form>`
                };
                    req.app.render('home',context, function(err, html) {
                        res.end(html);
                    });
                });
            });
        },
    update_process : (req, res) => {
        var body = '';
        req.on('data', (data) => {
            body = body + data;
        });
        req.on('end', () => {
            var post = qs.parse(body);
            db.query('UPDATE customer SET name=?, address=?, birth=?, phone=? WHERE id=?',
            [post.name, post.address, post.birth, post.phone, post.id],
            (error, result) => {
                res.writeHead(302, {Location: `/page/${post.id}`});
                res.end();
            });
        });
    },
    delete_process : (req, res) => {
        id = req.params.pageId;
        db.query('DELETE FROM customer WHERE id = ?',
        [id],
        (error, result) => {
            if( error ) {
                throw error;
            } res.writeHead(302, {Location: `/`});
            res.end();
        });
    }
}
