var mysql = require('mysql');
// mysql module

var db = mysql.createConnection({
    host: 'localhost',
    // address of the server
    user: 'nodejs',
    // username
    password: 'nodejs',
    // password
    database: 'webdb2023'
    // name of the database
});

db.connect();
// Database connection setting

module.exports = db;