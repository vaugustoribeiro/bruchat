var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.login) {
      res.render('index', { usuario: req.cookies.login });
  } 
  else {
      res.redirect('login');
  }
  next();
});

module.exports = router;
