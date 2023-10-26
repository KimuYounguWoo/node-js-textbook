// 201935231 컴퓨터공학과 김용우

var qs = require('querystring');
// querystring module

const db = require('./db');
// db module

var sanitizeHtml = require('sanitize-html');
// sanitize-html module

var cookie = require('cookie');
// cookie module

var createContext= '<a href="/create">create</a>&nbsp;&nbsp;';
function univContext(id) {
    return createContext + `<a href="/update/${id}">update</a>&nbsp;&nbsp;<a href="/delete/${id}" onclick='if(confirm("정말로 삭제하시겠습니까?")==false){ return false }'>delete</a>`;
} // Context Merge


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
    login : (req, res) => {
        var login  = `<a href = "/login">login</a>`
        db.query('SELECT * FROM topic', (error, topics) => {
            var context = {
                lg: login,
                title: 'Login',
                list: topics,
                control: createContext,
                body: `
                    <form action = "/login_process" method = "post">
                    <p><input type="text" name ="email" placeholder="email" value="email"</p>
                    <p><input type="password" name="password" placeholder="password" value="password"</p>
                    <p><input type="submit"></p>
                    </form>
                    `
            };
            req.app.render('home', context, (err, html) => {
            res.end(html)
            })
        });
    },


    login_process : (req, res) => {
            var post = req.body;
            if (post.email === 'admin' && post.password === 'admin') {
                req.session.is_logined = true;
                res.redirect('/');
            }
            else {
                res.end(`
                <script type="text/javascript">
                alert("ERROR :: No Username or Password");
                location.href = "/";
                </script>`
                );
            }
    },

    logout_process : (req, res) => {
        req.session.destroy( (err) => {
            res.redirect('/');
        })
    },
    upload: (req,res) => {
        var context = {
            lg: ''
        };
        req.app.render('uploadtest' ,context, (err, html) => {
            res.end(html);
        });
    },
}
