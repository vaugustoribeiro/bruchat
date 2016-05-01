var express = require('express');
var router = express.Router();

/* GET */
router.get('/', function(req, res, next) {
    res.render('consulta/index', { SOCKETIO_URL:  process.env.SOCKETIO_URL });
});

module.exports = router;


