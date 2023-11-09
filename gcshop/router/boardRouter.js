// 201935231 컴퓨터공학과 김용우
const express = require('express');
var router = express.Router()
var board = require('../lib/board');

module.exports = router;

router.get('/type/view', (req, res) => {
    board.typeView(req, res);
});

router.get('/type/create', (req, res) => {
    board.typeCreate(req, res);
});

router.post('/type/create_process', (req, res) => {
    board.typeCreate_process(req, res);
});

router.get('/type/update/:typeId', (req, res) => {
    board.typeUpdate(req, res);
});

router.post('/type/update_process', (req, res) => {
    board.typeUpdate_process(req, res);
});

router.post('/type/delete/:typeId', (req, res) => {
    board.typeDelete_proces(req, res);
});

router.get('/view/:typeId/:pNum', (req, res) => {
    board.view(req, res);
});

router.get('/create/:typeId', (req, res) => {
    board.create(req, res);
});
router.post('/create_process', (req, res) => {
    board.create_process(req, res);
});
router.get('/update/:boardId/:typeId/:pNum', (req, res) => {
    board.update(req, res);
});
router.post('/update_process', (req, res) => {
    board.update_process(req, res);
});
router.post('/view:typeId/:pNum', (req, res) => {
    board.delete(req, res);
});