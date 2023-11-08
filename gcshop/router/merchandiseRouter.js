// 201935231 컴퓨터공학과 김용우
const express = require('express');
var router = express.Router()
var merchandise = require('../lib/merchandise');

// 파일 upload
const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/images');
        },
        filename: function (req, file, cb) {
            //var newFileName = new Date().valueOf() + path.extname(file.originalname)
            var newFileName = file.originalname
            cb(null, newFileName);
        }
    })
});

router.get('/view/:vu',(req, res)=>{
    merchandise.view(req, res);
});

router.get('/create',(req,res)=>{
    merchandise.create(req,res);
})

router.post('/create_process',upload.single('uploadFile'),(req,res)=>{
    var file = req.file === undefined ? '/images/no.png' : '/images/' + req.file.filename
    merchandise.create_process(req,res,file);
})

router.get('/update/:merId',(req,res)=>{
    merchandise.update(req,res);
})
router.post('/update_process', upload.single('uploadFile'), (req,res)=>{
    var file = req.file === undefined ? '/images/no.png' : '/images/' + req.file.filename
    merchandise.update_process(req,res,file);
})

router.get('/delete/:merId',(req,res)=>{
    merchandise.delete_process(req,res);
})

module.exports = router;

