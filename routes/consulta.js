var express = require('express');
var router = express.Router();

/* GET */
router.get('/', function(req, res, next) {
    if(req.query.id)
    {
        
    }
    res.render('consulta/index', { idBruxo: req.query.id });
});

module.exports = router;


