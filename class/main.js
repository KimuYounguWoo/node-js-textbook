var http = require('http');
var app = http.createServer(function(req, res) {
    res.writeHead(504, 'Authoriztion: asdsaasdsasd');
    res.end("Hello, My frst response, Node.js !!!");
});
app.listen(3000);