var express = require('express');
var router = express.Router();

/* GET */
router.get('/criar', function(req, res, next) {
    res.render('sala/criar');
});
/* POST */
router.post('/criar', function(req, res, next) {
    res.send('sala/criar');
});

/* GET */
router.get('/entrar', function(req, res, next) {
    res.render('sala/entrar');
});
/* POST */
router.post('/entrar', function(req, res, next) {
    res.render('index');
});

module.exports = router;


