// 201935231 컴퓨터공학과 김용우
const express = require('express');
var router = express.Router()
var shop = require('../lib/shop');

router.get('/', (req, res) => {
    shop.home(req, res);
});

router.get('/shop', (req, res) => {
    shop.home(req, res);
});

router.get('/shop/:category', (req, res) => {
    shop.category(req, res);
});

module.exports = router;