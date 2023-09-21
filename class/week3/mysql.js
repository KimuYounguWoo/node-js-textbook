var mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    // user: 'root',
    // password: 'root',
    user: 'nodejs',
    password: 'nodejs',
    database: 'webdb2023'
});

db.connect();

db.query('SELECT * FROM topic', (error, results, fields) => {
    if (error) {
        console.log(error);
    }
    // console.log(results);
    console.log(fields);
    // console.log(results[0].descrpt);
});

db.end();