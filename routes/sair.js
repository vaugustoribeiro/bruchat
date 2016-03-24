var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.clearCookie('login');
  res.redirect('login');
  next();
});

module.exports = router;