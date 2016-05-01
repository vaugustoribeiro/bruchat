var express = require('express');
var router = express.Router();

/* GET */
router.get('/:id', function(req, res, next) {
    res.render('consulta/index', { parceiroId: req.params.id, SOCKETIO_URL:  process.env.SOCKETIO_URL });
});

module.exports = router;


