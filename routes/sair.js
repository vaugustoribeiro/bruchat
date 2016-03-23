var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.clearCookie('usuario');
  res.redirect('login');
  next();
});

module.exports = router;