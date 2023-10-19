var http = require('http');
var fs = require('fs');
var urlm = require('url'); // ① url 모듈 요청, url 모듈에 담긴 기능 사용 가능
const path = require('path');
var app = http.createServer(function (req, res) {
    var _url = req.url;
    var queryData = urlm
        .parse(_url, true)
        .query // ② url에서 querystring 문자열만 추출
    console.log(_url);
    console.log(queryData.id); // ③ queryData.id로 바꾸어서도 실행 시켜보기
    console.log(queryData.pw);
    console.log(queryData.pathname);
    if (req.url == '/') {
        _url = '/index.html';
    }
    if (req.url == '/favicon.ico') {
        return res.writeHead(404);
    }
    res.writeHead(200);
    res.end(queryData.id); // ④ 추가
    //res.end(fs.readFileSync(__dirname + _url));  ⑤ 주석처리
});
app.listen(3000);
