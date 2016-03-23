var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.usuario) {
      res.render('index', { usuario: req.cookies.usuario });
  } 
  else {
      res.redirect('login');
  }
  next();
});

module.exports = router;
