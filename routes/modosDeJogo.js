var express = require('express');
var router = express.Router();

/* GET */

router.get('/:nomeJogo/:readonly', function(req, res, next) {
    
    res.render('modos_de_jogo/' + req.params.nomeJogo, { READONLY: req.params.readonly === 'true' });
});

module.exports = router;


