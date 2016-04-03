var express = require('express');
var router = express.Router();

/* GET */
router.get('/', function(req, res, next) {
    res.render('consulta/index', { parceiroId: null });
});
router.get('/:id', function(req, res, next) {
    res.render('consulta/index', { parceiroId: req.params.id });
});

module.exports = router;


