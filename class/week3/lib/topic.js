const db = require('./db');

module.exports = {
    home: (req, res) => {
        db.query('SELECT * FROM topic', (error, results) => {

            var lists = `<ol type="1">`;

            var i = 0;

            while ( i < results.length ) {
                lists = lists + `<li><a href = "#">${results[i].title}</a></li>`
                i += 1;
            }
            lists = lists + `</ol>`
        
            var context = {list: lists,
                        title: 'Welcome-db module generated'};
                    res.render('home', context, (err, html) => {
                    res.end(html) 
                    }
                )
            }
        );
        db.end();
    },
    test : (req, res) => {
        db.query('SELECT * FROM topic', (error, results) => {
        
            var lists = `<div>`;
            lists = lists + `${results[4].title}<br>${results[4].descrpt}`
            lists = lists + `</div>`
    
            var context = {
                list: lists,
                title: 'Welcome'};
        res.render('home', context, (err, html) => {
            res.end(html) })
        });
        db.end();
    }
}




