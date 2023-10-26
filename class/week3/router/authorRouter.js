var express = require('express');
var router = express.Router();

var author = require('../lib/author');

// ====================== Author Page ======================
router.get('/', (req, res) => {
    author.home(req, res);
}) // author home

router.post('/create_process', (req, res) => {
    author.create_process(req, res);
}) // author create process

router.get('/update/:id', (req,res) => {
    author.update(req,res);
}) // author update

router.post('/update_process', (req, res) => {
    author.update_process(req, res);
}) // author update process

router.get('/delete/:id', (req, res) => {
    author.delete_process(req, res);
}) // author delete process

module.exports = router;