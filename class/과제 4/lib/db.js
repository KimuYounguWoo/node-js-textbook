// 201935231 컴퓨터공학과 김용우

var mysql = require('mysql');
// mysql module

var db = mysql.createConnection({
    host: 'localhost',
    // address of the server
    user: 'root',
    // username
    password: 'root',
    // password
    database: 'webdb2023'
    // name of the database
});

db.connect();
// Database connection setting

module.exports = db;