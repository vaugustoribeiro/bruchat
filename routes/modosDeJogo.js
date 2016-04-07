var express = require('express');
var router = express.Router();

/* GET */

router.get('/:nomeJogo', function(req, res, next) {
    res.render('modos_de_jogo/' + req.params.nomeJogo);
});

module.exports = router;


