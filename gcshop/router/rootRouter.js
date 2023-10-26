var express = require('express');
var router = express.Router();

// function sdf(date) {
// 	const separator = "";
	
// 	var todayString = date.getFullYear() + separator;
// 	todayString += (((date.getMonth() + 1) < 10) ? "0" : "") + (date.getMonth() + 1) + separator;
// 	todayString += ((date.getDate() < 10) ? "0" : "") + date.getDate();
	
// 	return todayString;
// }


// var multer = require('multer');
// // MUL tipart/form-data rou TER
// // body-parser로는 multipart/form-data를 해석할 수 없다.
// // 따라서 multer 모듈을 사용한다.

// const upload = multer( {
//     storage: multer.diskStorage( {
//         destination: function (req, file, path) { // 저장 경로
//             path(null, 'public/images');
//             // path -> 저장 경로를 설정하는 콜백 함수
//         },
//         filename: function (req, file, naming) { // 파일 이름
//             var newFileName = sdf(new Date()) + "_" + file.originalname;
//             naming(null, newFileName);
//             // naming -> 파일 이름을 설정하는 콜백 함수
//         }
//     }), // storage
// });


var shop = require('../lib/shop');

// ====================== login Page ======================
router.get('/', (req, res) => {
    shop.home(req, res);
}) // home page

// router.get('/page/:pageId', (req, res) => {
//     topic.page(req, res);
// })  // page

// router.get('/create', (req,res) => {
//     topic.create(req,res);
// }) // create

// router.post('/create_process', (req,res) => {
//     topic.create_process(req,res);
// }) // create process

// router.get('/update/:pageId', (req,res) => {
//     topic.update(req,res);
// }) // update

// router.post('/update_process', (req,res) => {
//     topic.update_process(req,res);
// }) // update process

// router.get('/delete/:pageId', (req, res) => {
//     topic.delete_process(req, res);
// }) // delete process

// router.get('/login', (req, res) => {
//     topic.login(req, res);
// }) // login page

// router.post('/login_process', (req, res) => {
//     topic.login_process(req, res);
// }) // login process

// router.get('/logout_process', (req, res) => {
//     topic.logout_process(req, res);
// }) // logout process

// router.get('/upload',(req, res)=>{
//     topic.upload(req, res);
// })

// router.post('/upload_process', upload.single('uploadFile'), (req, res) => { // upload.single('str') -> str은 form에서 file input의 name
//     var file = '/images/' + req.file.filename
//     res.send(`
//     <h1>Image Upload Successfully</h1>
//     <a href="/">Back</a>
//     <p><img src="${file}" alt="image 출력"/></p>`
//     );
//     console.log(file);
// })

module.exports = router;