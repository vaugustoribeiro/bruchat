var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { SOCKETIO_URL:  process.env.SOCKETIO_URL });
});

module.exports = router;