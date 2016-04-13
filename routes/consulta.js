var express = require('express');
var router = express.Router();

/* GET */
router.get('/', function(req, res, next) {
    res.render('cartomante/index', { parceiroId: null });
});
router.get('/:id', function(req, res, next) {
    res.render('consulente/index', { parceiroId: req.params.id });
});

module.exports = router;


